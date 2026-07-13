package com.asdf.codinggolingbe.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.dto.WeakConceptResponse;
import com.asdf.codinggolingbe.repository.ChallengeAttemptRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ChallengeAttemptRepository challengeAttemptRepository;

    @Transactional(readOnly = true)
    public List<WeakConceptResponse> getWeakConcepts(Long userId) {
        return challengeAttemptRepository.findWeakConcepts(userId).stream()
                .map(WeakConceptResponse::from)
                .toList();
    }
}
