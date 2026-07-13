package com.asdf.codinggolingbe.ai;

/**
 * AI 퀘스트 생성 요청 (04번 문서). 값이 없으면 서버가 현재 progress 에서 채운다.
 */
public record QuestGenRequest(
        Integer xp,
        Integer streak,
        Integer recentAccuracy) {
}
