package com.ssf.member.domain.user.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Message {

    POSSIBLE_EMAIL("사용 가능한 이메일"),
    IMPOSSIBLE_EMAIL("사용 중인 이메일"),
    POSSIBLE_NICKNAME("사용 가능한 닉네임"),
    IMPOSSIBLE_NICKNAME("사용 중인 닉네임");

    private final String value;
}
