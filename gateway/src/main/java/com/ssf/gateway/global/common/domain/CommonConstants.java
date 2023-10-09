package com.ssf.gateway.global.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonConstants {

    EMAIL_CHECK_REQUEST_URL("/api/auth/email"),
    EMAIL_NICKNAME_REQUEST_URL("/api/auth/nickname"),
    SIGN_UP_REQUEST_URL("/api/auth/sign-up"),
    SIGN_IN_REQUEST_URL("/api/auth/sign-in"),
    RE_ISSUANCE_ACCESS_TOKEN_URL("/api/auth/access-token"),
    SOCKET_URL("/api/socket");

    private final String value;
}
