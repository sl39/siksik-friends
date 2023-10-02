package com.ssf.auth.domain.user.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("ROLE_GUEST"),
    USER("ROLE_USER"),
    VIP("ROLE_VIP"),
    MANAGER("ROLE_MANAGER");

    private final String key;
}
