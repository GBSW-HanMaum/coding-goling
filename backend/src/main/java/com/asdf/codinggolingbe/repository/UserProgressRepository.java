package com.asdf.codinggolingbe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.dto.LeaderboardRow;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    Optional<UserProgress> findByUserId(Long userId);

    /** 별도 랭킹 테이블 없이 user_progress.xp 기준 정렬 (11번 문서). */
    @Query("""
            select new com.asdf.codinggolingbe.dto.LeaderboardRow(u.id, u.nickname, p.xp)
            from UserProgress p
            join User u on u.id = p.userId
            order by p.xp desc, u.id asc
            """)
    List<LeaderboardRow> findTopRankers(Pageable pageable);
}
