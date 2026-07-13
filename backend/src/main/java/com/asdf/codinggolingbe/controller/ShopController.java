package com.asdf.codinggolingbe.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.PurchaseRequest;
import com.asdf.codinggolingbe.dto.PurchaseResponse;
import com.asdf.codinggolingbe.dto.ShopItemResponse;
import com.asdf.codinggolingbe.service.ShopService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** 화면6(상점) — 11번 문서. */
@RestController
@RequestMapping("/api/v1/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping("/items")
    public ApiResponse<List<ShopItemResponse>> getItems(Authentication authentication) {
        return ApiResponse.success(shopService.getItems(userId(authentication)));
    }

    @GetMapping("/inventory")
    public ApiResponse<List<ShopItemResponse>> getInventory(Authentication authentication) {
        return ApiResponse.success(shopService.getInventory(userId(authentication)));
    }

    @PostMapping("/purchase")
    public ApiResponse<PurchaseResponse> purchase(
            Authentication authentication,
            @Valid @RequestBody PurchaseRequest request) {
        return ApiResponse.success(
                shopService.purchase(userId(authentication), request),
                "구매가 완료되었습니다.");
    }

    private Long userId(Authentication authentication) {
        return (Long) authentication.getPrincipal();
    }
}
