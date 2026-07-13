package com.asdf.codinggolingbe.dto;

import jakarta.validation.constraints.NotBlank;

public record PurchaseRequest(
        @NotBlank(message = "itemId 는 필수입니다.")
        String itemId) {
}
