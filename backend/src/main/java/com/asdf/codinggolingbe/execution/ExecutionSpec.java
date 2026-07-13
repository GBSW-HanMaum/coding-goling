package com.asdf.codinggolingbe.execution;

import java.util.List;

import com.asdf.codinggolingbe.domain.Language;

/**
 * 언어별 Docker 실행 스펙 — 어떤 이미지에서, 어떤 파일명으로, 어떤 명령으로 컴파일·실행할지.
 * 언어를 추가하려면 여기에 한 줄 늘리면 된다 (03번 문서: "language 분기만 늘리면 됨").
 */
public enum ExecutionSpec {

    /**
     * 컴파일 실패는 전용 종료코드(COMPILE_ERROR_EXIT)로 알린다.
     * 이렇게 해야 "컴파일 에러"와 "컴파일은 됐는데 실행 중 죽음(segfault 등)"을 구분할 수 있다.
     */
    C(
            Language.C,
            "gcc:13",
            "solution.c",
            "gcc -O0 -w /work/solution.c -o /tmp/solution 2> /tmp/compile.err"
                    + " || { cat /tmp/compile.err >&2; exit 101; };"
                    + " exec /tmp/solution"),

    JAVA(
            Language.JAVA,
            "eclipse-temurin:21-jdk",
            // public class 이름과 파일명이 같아야 하므로 Main 으로 고정한다
            "Main.java",
            "cd /tmp && cp /work/Main.java .;"
                    + " javac Main.java 2> /tmp/compile.err"
                    + " || { cat /tmp/compile.err >&2; exit 101; };"
                    + " exec java Main");

    /** 컨테이너가 이 코드로 끝나면 컴파일 실패 */
    public static final int COMPILE_ERROR_EXIT = 101;

    private final Language language;
    private final String image;
    private final String fileName;
    private final String command;

    ExecutionSpec(Language language, String image, String fileName, String command) {
        this.language = language;
        this.image = image;
        this.fileName = fileName;
        this.command = command;
    }

    public String image() {
        return image;
    }

    public String fileName() {
        return fileName;
    }

    /** 컨테이너 안에서 sh -c 로 실행할 명령 */
    public String command() {
        return command;
    }

    /** Docker 로 실행해야 하는 언어인지 (Python/JS 는 프론트에서 돌아간다) */
    public static boolean isSupported(Language language) {
        return find(language) != null;
    }

    public static ExecutionSpec of(Language language) {
        ExecutionSpec spec = find(language);
        if (spec == null) {
            throw new IllegalArgumentException("Docker 실행을 지원하지 않는 언어: " + language);
        }
        return spec;
    }

    private static ExecutionSpec find(Language language) {
        return List.of(values()).stream()
                .filter(s -> s.language == language)
                .findFirst()
                .orElse(null);
    }
}
