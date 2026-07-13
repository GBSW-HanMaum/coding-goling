package com.asdf.codinggolingbe.ai;

import java.util.List;

/**
 * Spring → 프론트 힌트 응답.
 * source 로 AI가 만든 힌트인지(ai) 폴백인지(static) 구분해 프론트가 배지를 붙일 수 있게 한다.
 */
public record HintResponse(
        String hint,
        List<String> conceptsToReview,
        String source) {

    public static HintResponse ai(String hint, List<String> concepts) {
        return new HintResponse(hint, concepts, "ai");
    }

    public static HintResponse fallback(String hint) {
        return new HintResponse(hint, List.of(), "static");
    }
}
