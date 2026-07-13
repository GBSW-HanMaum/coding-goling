package com.asdf.codinggolingbe.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.dto.LeaderboardRow;
import com.asdf.codinggolingbe.dto.RankerResponse;
import com.asdf.codinggolingbe.repository.UserProgressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private static final int TOP_N = 20;

    private final UserProgressRepository userProgressRepository;

    @Transactional(readOnly = true)
    public List<RankerResponse> getLeaderboard(Long meId) {
        List<LeaderboardRow> rows = userProgressRepository.findTopRankers(PageRequest.of(0, TOP_N));

        List<RankerResponse> result = new ArrayList<>(rows.size());
        for (int i = 0; i < rows.size(); i++) {
            LeaderboardRow row = rows.get(i);
            result.add(new RankerResponse(
                    i + 1,
                    row.nickname(),
                    row.xp(),
                    row.userId().equals(meId)));
        }
        return result;
    }
}
