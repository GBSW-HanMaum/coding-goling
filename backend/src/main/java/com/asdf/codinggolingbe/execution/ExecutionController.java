package com.asdf.codinggolingbe.execution;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.common.CustomException;
import com.asdf.codinggolingbe.common.ErrorCode;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * 화면3 — C/Java 실행 채점 (03번 문서).
 * Python/JS 는 프론트(Pyodide/브라우저)에서 돌아가므로 여기 오지 않는다.
 */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ExecutionController {

    private final ExecutionService executionService;

    @PostMapping("/execute")
    public ApiResponse<ExecuteResult> execute(@Valid @RequestBody ExecuteRequest request) {
        if (!ExecutionSpec.isSupported(request.language())) {
            throw new CustomException(
                    ErrorCode.INVALID_INPUT,
                    request.language() + " 는 서버 실행 대상이 아닙니다. (브라우저에서 실행됩니다)");
        }
        return ApiResponse.success(executionService.execute(request));
    }
}
