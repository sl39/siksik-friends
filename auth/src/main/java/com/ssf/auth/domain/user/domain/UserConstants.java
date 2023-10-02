package com.ssf.auth.domain.user.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserConstants {

    DEFAULT_PROFILE_URL("/images/character/rabbit.png");

    private final String value;
}
