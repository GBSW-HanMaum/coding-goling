package com.asdf.codinggolingbe.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.RankerResponse;
import com.asdf.codinggolingbe.service.LeaderboardService;

import lombok.RequiredArgsConstructor;

/** 화면4(리더보드) — 11번 문서. */
@RestController
@RequestMapping("/api/v1/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping
    public ApiResponse<List<RankerResponse>> getLeaderboard(Authentication authentication) {
        Long meId = (Long) authentication.getPrincipal();
        return ApiResponse.success(leaderboardService.getLeaderboard(meId));
    }
}
