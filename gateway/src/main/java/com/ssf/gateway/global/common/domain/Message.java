package com.ssf.gateway.global.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Message {

    NO_TOKEN("토큰이 없습니다."),
    INVALID_AUTH_TYPE("토큰 인증 방식이 올바르지 않습니다."),
    INVALID_TOKEN("유효하지 않은 토큰 입니다."),
    EXPIRED_TOKEN("토큰이 만료되었습니다."),
    SIGN_IN_REQUIRED("로그인이 필요합니다.");

    private final String value;
}
