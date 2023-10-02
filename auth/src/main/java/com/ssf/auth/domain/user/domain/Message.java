package com.ssf.auth.domain.user.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Message {

    POSSIBLE_EMAIL("사용 가능한 이메일입니다."),
    USING_EMAIL("사용 중인 이메일입니다."),
    POSSIBLE_NICKNAME("사용 가능한 닉네임입니다."),
    USING_NICKNAME("사용 중인 닉네임입니다.");

    private final String value;
}
