package com.ssf.member.global.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Constants {

    RANK_KEY("rank"),
    BLACK_LIST("blackList");


    private final String value;
}
