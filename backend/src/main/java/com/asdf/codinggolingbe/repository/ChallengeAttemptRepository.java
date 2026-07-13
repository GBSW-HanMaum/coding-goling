package com.asdf.codinggolingbe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asdf.codinggolingbe.domain.ChallengeAttempt;
import com.asdf.codinggolingbe.dto.WeakConceptRow;

public interface ChallengeAttemptRepository extends JpaRepository<ChallengeAttempt, Long> {

    List<ChallengeAttempt> findByUserId(Long userId);

    /**
     * 문제별 시도/오답 수 집계 (11번 문서 화면7).
     * 개념 태그(conceptTags)는 프론트 content.ts 가 갖고 있으므로 서버는 challenge_id 별 오답 수만 준다.
     * 한 번도 안 틀린 문제는 취약점이 아니므로 제외.
     */
    @Query("""
            select new com.asdf.codinggolingbe.dto.WeakConceptRow(
                a.challengeId,
                count(a),
                sum(case when a.correct = false then 1L else 0L end))
            from ChallengeAttempt a
            where a.userId = :userId
            group by a.challengeId
            having sum(case when a.correct = false then 1L else 0L end) > 0
            order by sum(case when a.correct = false then 1L else 0L end) desc, a.challengeId asc
            """)
    List<WeakConceptRow> findWeakConcepts(@Param("userId") Long userId);
}
