-- ============================================================
-- CodingGoling (코딩고링) — MySQL 스키마
-- ERD 기반. root 비번: mysql
-- 실행: mysql -u root -pmysql < schema.sql
-- (또는 Claude Code에게 이 파일 실행 요청)
-- ============================================================

CREATE DATABASE IF NOT EXISTS codingoling_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE codingoling_db;

-- 개발 편의상 기존 테이블 드롭 후 재생성 (운영에선 쓰지 말 것)
DROP TABLE IF EXISTS user_quest;
DROP TABLE IF EXISTS quest;
DROP TABLE IF EXISTS user_inventory;
DROP TABLE IF EXISTS shop_item;
DROP TABLE IF EXISTS challenge_attempt;
DROP TABLE IF EXISTS lesson_completion;
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS users;

-- ------------------------------------------------------------
-- users : 계정 + 온보딩 정보
-- (프론트 useGame의 온보딩 필드 + 로그인 정보를 합침)
-- ------------------------------------------------------------
CREATE TABLE users (
  id                    BIGINT       NOT NULL AUTO_INCREMENT,
  email                 VARCHAR(255) NOT NULL,
  password              VARCHAR(255) NOT NULL,               -- BCrypt 해시
  nickname              VARCHAR(50)  NOT NULL,
  selected_language     VARCHAR(20)  NULL,                   -- PYTHON / C / JAVA / JAVASCRIPT (온보딩 전 NULL)
  onboarding_completed  BOOLEAN      NOT NULL DEFAULT FALSE,
  learning_goal         VARCHAR(100) NULL,                   -- 온보딩: 배우는 이유
  self_reported_level   VARCHAR(50)  NULL,                   -- 온보딩: 자가 평가 수준
  daily_goal_minutes    INT          NULL,                   -- 온보딩: 일일 학습 목표(분)
  created_at            DATETIME     NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- user_progress : 유저 1명당 1행 (1:1). 자주 바뀌는 진행 상태
-- 프론트 useGame의 energy/xp/gems/streak 대응
-- ------------------------------------------------------------
CREATE TABLE user_progress (
  id                BIGINT   NOT NULL AUTO_INCREMENT,
  user_id           BIGINT   NOT NULL,
  xp                INT      NOT NULL DEFAULT 0,
  energy            INT      NOT NULL DEFAULT 25,             -- MAX_ENERGY = 25
  gems              INT      NOT NULL DEFAULT 500,            -- 프론트 초기값 500
  streak_count      INT      NOT NULL DEFAULT 1,
  last_active_date  DATE     NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_progress_user (user_id),
  CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- lesson_completion : 완료한 레슨 (1:N)
-- lesson_id 는 프론트 content.ts 의 Lesson.id 문자열 그대로
-- ------------------------------------------------------------
CREATE TABLE lesson_completion (
  id            BIGINT       NOT NULL AUTO_INCREMENT,
  user_id       BIGINT       NOT NULL,
  lesson_id     VARCHAR(100) NOT NULL,
  score_ratio   DOUBLE       NOT NULL DEFAULT 1.0,           -- 통과 테스트케이스 비율
  completed_at  DATETIME     NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_completion_user_lesson (user_id, lesson_id),  -- 같은 레슨 중복 완료 방지
  CONSTRAINT fk_completion_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- challenge_attempt : 문제별 정답/오답 기록 (1:N)
-- 마이페이지의 "취약 개념" 집계에 사용
-- challenge_id 는 프론트 content.ts 의 Challenge.id 문자열 그대로
-- ------------------------------------------------------------
CREATE TABLE challenge_attempt (
  id            BIGINT       NOT NULL AUTO_INCREMENT,
  user_id       BIGINT       NOT NULL,
  challenge_id  VARCHAR(100) NOT NULL,
  is_correct    BOOLEAN      NOT NULL,
  created_at    DATETIME     NOT NULL,
  PRIMARY KEY (id),
  KEY idx_attempt_user (user_id),
  CONSTRAINT fk_attempt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- shop_item : 상점 아이템 마스터 (전역 공통, 유저 무관)
-- 프론트 data/misc.ts 의 SHOP_ITEMS 대응 → 시드로 넣음
-- ------------------------------------------------------------
CREATE TABLE shop_item (
  id            VARCHAR(50)  NOT NULL,                        -- 'refill', 'streak-freeze' 등 문자열 id
  title         VARCHAR(100) NOT NULL,
  description   VARCHAR(255) NOT NULL,
  emoji         VARCHAR(10)  NULL,
  cost_gems     INT          NOT NULL,                        -- 젬 가격
  action        VARCHAR(30)  NULL,                            -- 'refill' 등 특수 동작 (없으면 NULL)
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- user_inventory : 유저가 구매/보유한 아이템 (1:N)
-- ------------------------------------------------------------
CREATE TABLE user_inventory (
  id            BIGINT       NOT NULL AUTO_INCREMENT,
  user_id       BIGINT       NOT NULL,
  shop_item_id  VARCHAR(50)  NOT NULL,
  acquired_at   DATETIME     NOT NULL,
  PRIMARY KEY (id),
  KEY idx_inventory_user (user_id),
  CONSTRAINT fk_inventory_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_inventory_item FOREIGN KEY (shop_item_id) REFERENCES shop_item(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- quest : 퀘스트 (1:N, 유저별). AI 생성 or 기본 퀘스트
-- 프론트 data/misc.ts 의 QUESTS 대응
-- ------------------------------------------------------------
CREATE TABLE quest (
  id            BIGINT       NOT NULL AUTO_INCREMENT,
  user_id       BIGINT       NOT NULL,
  title         VARCHAR(100) NOT NULL,
  goal_value    INT          NOT NULL,                        -- 목표 XP
  progress      INT          NOT NULL DEFAULT 0,
  ai_generated  BOOLEAN      NOT NULL DEFAULT FALSE,
  expires_at    DATETIME     NULL,                            -- 일일 퀘스트 만료 시각
  created_at    DATETIME     NOT NULL,
  PRIMARY KEY (id),
  KEY idx_quest_user (user_id),
  CONSTRAINT fk_quest_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 시드 데이터 : 상점 아이템 (프론트 SHOP_ITEMS 그대로)
-- ============================================================
INSERT INTO shop_item (id, title, description, emoji, cost_gems, action) VALUES
  ('refill',        '에너지 가득 채우기',      '힌트와 AI 튜터를 마음껏 쓸 수 있게 에너지를 최대치로.', '⚡',  200, 'refill'),
  ('streak-freeze', '연속 학습 보호',          '하루 빠져도 연속 기록(streak)이 끊기지 않아요.',        '🧊', 100, NULL),
  ('double-xp',     '더블 XP 15분',            '15분 동안 획득 XP가 2배.',                              '⏱️', 120, NULL),
  ('c-track',       'C 시스템 트랙 잠금 해제',  '포인터·동적 메모리·크래시 디버깅 심화 트랙.',           '⚙️', 300, NULL);
