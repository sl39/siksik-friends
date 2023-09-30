package com.ssf.member.global.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Constants {

    RANK_KEY("rank"),
    ACCESS_TOKEN_SUBJECT("AccessToken"),
    REFRESH_TOKEN_SUBJECT("RefreshToken"),
    ID_CLAIM("id"),
    AUTH_TYPE("Bearer ");


    private final String value;
}
