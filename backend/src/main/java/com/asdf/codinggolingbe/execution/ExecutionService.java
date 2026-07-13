package com.asdf.codinggolingbe.execution;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.asdf.codinggolingbe.common.CustomException;
import com.asdf.codinggolingbe.common.ErrorCode;

import lombok.extern.slf4j.Slf4j;

/**
 * 사용자 코드를 Docker 컨테이너에서 컴파일·실행한다 (03번 문서).
 *
 * 격리 (발표 강조 포인트):
 *   --network none        네트워크 차단
 *   --memory 128m         메모리 상한 (fork bomb / 무한 할당 방지)
 *   --pids-limit 64       프로세스 수 상한
 *   --cpus 0.5            CPU 상한
 *   --read-only           루트 파일시스템 읽기 전용
 *   --tmpfs /tmp          쓰기는 컨테이너 메모리에만 (호스트에 안 남음)
 *   -v <dir>:/work:ro     소스는 읽기 전용 마운트 (호스트 파일시스템 접근 불가)
 *   --user 65534          nobody 로 실행
 *   타임아웃 초과 시 컨테이너 kill
 */
@Slf4j
@Service
public class ExecutionService {

    /** 출력이 무한정 커지는 걸 막는다 (메모리 보호) */
    private static final int MAX_OUTPUT_CHARS = 10_000;

    private final long timeoutSeconds;

    public ExecutionService(@Value("${execution.docker-timeout-seconds:5}") long timeoutSeconds) {
        this.timeoutSeconds = timeoutSeconds;
    }

    public ExecuteResult execute(ExecuteRequest request) {
        ExecutionSpec spec = ExecutionSpec.of(request.language());

        Path workDir = null;
        try {
            workDir = Files.createTempDirectory("coderun-");
            Files.writeString(
                    workDir.resolve(spec.fileName()),
                    request.code(),
                    StandardCharsets.UTF_8);

            return runContainer(spec, workDir, request.stdinOrEmpty());

        } catch (IOException e) {
            log.error("실행 준비 실패", e);
            throw new CustomException(ErrorCode.INTERNAL_ERROR, "코드 실행을 준비하지 못했습니다.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CustomException(ErrorCode.INTERNAL_ERROR, "실행이 중단되었습니다.");
        } finally {
            deleteQuietly(workDir);
        }
    }

    private ExecuteResult runContainer(ExecutionSpec spec, Path workDir, String stdin)
            throws IOException, InterruptedException {

        String containerName = "coderun-" + UUID.randomUUID();
        List<String> command = dockerCommand(spec, workDir, containerName);

        Process process = new ProcessBuilder(command).start();

        // stdin 전달 후 즉시 닫는다 — 안 닫으면 input() 을 기다리며 영원히 멈춘다
        try (var out = process.getOutputStream()) {
            out.write(stdin.getBytes(StandardCharsets.UTF_8));
            out.flush();
        } catch (IOException ignored) {
            // 컨테이너가 입력을 읽기 전에 끝난 경우 — 정상이다
        }

        // 출력은 별도 스레드로 빨아들인다 (파이프 버퍼가 차면 컨테이너가 블록되므로)
        var stdoutReader = readAsync(process.getInputStream());
        var stderrReader = readAsync(process.getErrorStream());

        boolean finished = process.waitFor(timeoutSeconds, TimeUnit.SECONDS);
        if (!finished) {
            // 무한 루프 — 컨테이너를 강제 종료한다 (docker kill 이 없으면 좀비로 남는다)
            killContainer(containerName);
            process.destroyForcibly();
            stdoutReader.join();
            stderrReader.join();
            return ExecuteResult.timeout();
        }

        stdoutReader.join();
        stderrReader.join();

        String stdout = truncate(stdoutReader.text());
        String stderr = truncate(stderrReader.text());

        // 컴파일 실패만 전용 종료코드로 구분한다.
        // 이걸 exit != 0 로 뭉뚱그리면 segfault 같은 런타임 크래시가 컴파일 에러로 둔갑한다.
        if (process.exitValue() == ExecutionSpec.COMPILE_ERROR_EXIT) {
            return ExecuteResult.compileFailed(stderr);
        }

        // 그 외 비정상 종료(segfault, 예외 등)는 stderr 를 그대로 실어 보낸다 —
        // 사용자에겐 "실행은 됐는데 죽었다"는 사실 자체가 중요한 정보다.
        return ExecuteResult.ok(stdout, stderr);
    }

    private List<String> dockerCommand(ExecutionSpec spec, Path workDir, String containerName) {
        List<String> cmd = new ArrayList<>(List.of(
                "docker", "run",
                "--rm",
                "-i", // stdin 전달
                "--name", containerName,
                "--network", "none",
                "--memory", "128m",
                "--memory-swap", "128m", // 스왑까지 막아야 메모리 상한이 의미를 가진다
                "--pids-limit", "64",
                "--cpus", "0.5",
                "--read-only",
                "--tmpfs", "/tmp:exec,size=64m", // javac/gcc 산출물을 여기에 쓴다
                "--user", "65534:65534", // nobody
                "-v", workDir.toAbsolutePath() + ":/work:ro",
                "-w", "/work",
                spec.image(),
                "sh", "-c",
                // 컴파일 실패 시 종료코드 101 을 그대로 내보내야 하므로 여기서 감싸지 않는다
                spec.command()));

        return cmd;
    }

    private void killContainer(String containerName) {
        try {
            new ProcessBuilder("docker", "kill", containerName)
                    .redirectErrorStream(true)
                    .start()
                    .waitFor(5, TimeUnit.SECONDS);
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            log.warn("컨테이너 강제 종료 실패: {}", containerName);
        }
    }

    /** 스트림을 백그라운드에서 끝까지 읽는다 */
    private static StreamReader readAsync(java.io.InputStream in) {
        StreamReader reader = new StreamReader(in);
        reader.start();
        return reader;
    }

    private static final class StreamReader extends Thread {
        private final java.io.InputStream in;
        private volatile String text = "";

        StreamReader(java.io.InputStream in) {
            this.in = in;
            setDaemon(true);
        }

        @Override
        public void run() {
            try {
                text = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            } catch (IOException e) {
                text = "";
            }
        }

        String text() {
            return text;
        }
    }

    private static String truncate(String s) {
        if (s.length() <= MAX_OUTPUT_CHARS) {
            return s;
        }
        return s.substring(0, MAX_OUTPUT_CHARS) + "\n… (출력이 너무 길어 잘렸습니다)";
    }

    private static void deleteQuietly(Path dir) {
        if (dir == null) {
            return;
        }
        try (var paths = Files.walk(dir)) {
            paths.sorted(java.util.Comparator.reverseOrder()).forEach(p -> {
                try {
                    Files.deleteIfExists(p);
                } catch (IOException ignored) {
                    // 정리 실패는 무시 — OS 가 임시 디렉터리를 결국 치운다
                }
            });
        } catch (IOException ignored) {
            // 위와 동일
        }
    }
}
