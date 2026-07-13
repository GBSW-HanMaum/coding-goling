package com.asdf.codinggolingbe.config;

import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.domain.User;
import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.repository.UserProgressRepository;
import com.asdf.codinggolingbe.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * 데모용 라이벌 시드 (11번 문서: "유저가 나 혼자면 랭킹이 썰렁하니 RIVALS 를 실제 users 행으로 INSERT").
 * 프론트 data/misc.ts 의 RIVALS 8명을 그대로 넣는다.
 * 이미 있으면 건너뛰므로 서버를 여러 번 켜도 중복 생성되지 않는다.
 */
@Slf4j
@Configuration
public class DemoRivalSeeder {

    /** nickname, xp — 이메일은 닉네임 기반으로 만든다 (로그인은 안 되는 데모 계정) */
    private record Rival(String nickname, int xp, String email) {
    }

    private static final List<Rival> RIVALS = List.of(
            new Rival("지우", 640, "jiwoo@demo.codingoling"),
            new Rival("해린", 512, "haerin@demo.codingoling"),
            new Rival("민준", 430, "minjun@demo.codingoling"),
            new Rival("sora_dev", 350, "sora@demo.codingoling"),
            new Rival("코딩곰", 300, "bear@demo.codingoling"),
            new Rival("yuna", 210, "yuna@demo.codingoling"),
            new Rival("박태오", 150, "taeo@demo.codingoling"),
            new Rival("guest_92", 80, "guest92@demo.codingoling"));

    @Bean
    ApplicationRunner seedDemoRivals(
            UserRepository userRepository,
            UserProgressRepository userProgressRepository,
            PasswordEncoder passwordEncoder) {

        return args -> seed(userRepository, userProgressRepository, passwordEncoder);
    }

    @Transactional
    void seed(
            UserRepository userRepository,
            UserProgressRepository userProgressRepository,
            PasswordEncoder passwordEncoder) {

        int created = 0;
        for (Rival rival : RIVALS) {
            if (userRepository.existsByEmail(rival.email())) {
                continue;
            }
            User user = userRepository.save(User.signup(
                    rival.email(),
                    // 데모 계정 — 로그인 용도가 아니라 랭킹을 채우기 위한 행이다
                    passwordEncoder.encode("demo-account-not-for-login"),
                    rival.nickname()));

            UserProgress progress = UserProgress.createFor(user.getId());
            progress.addXp(rival.xp());
            userProgressRepository.save(progress);
            created++;
        }
        if (created > 0) {
            log.info("데모 라이벌 {}명 시드 완료", created);
        }
    }
}
