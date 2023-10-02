package com.ssf.auth.global.jwt.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum JwtConstants {

    ACCESS_TOKEN_SUBJECT("AccessToken"),
    REFRESH_TOKEN_SUBJECT("RefreshToken"),
    AUTH_TYPE("Bearer "),
    ID_CLAIM("id"),
    EXP_CLAIM("exp");

    private final String value;
}
