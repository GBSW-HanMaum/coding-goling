package com.asdf.codinggolingbe.dto;

/** 에너지 증감 (힌트 사용 시 음수, 보상 시 양수). 서버에서 0~MAX 로 clamp. */
public record EnergyRequest(int delta) {
}
