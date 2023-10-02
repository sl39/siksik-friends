package com.ssf.auth.global.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonConstants {

    RANK_KEY("rank"),
    BLACK_LIST("blackList");

    private final String value;
}
