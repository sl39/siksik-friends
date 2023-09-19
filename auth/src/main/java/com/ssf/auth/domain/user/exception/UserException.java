package com.ssf.auth.domain.user.exception;

import com.ssf.auth.domain.user.enums.UserErrorResult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserException extends RuntimeException {

    private final UserErrorResult errorResult;
}
