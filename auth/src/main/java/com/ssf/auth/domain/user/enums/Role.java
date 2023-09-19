package com.ssf.auth.domain.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("ROLE_GUEST"), MEMBER("ROLE_MEMBER"), VIP("ROLE_VIP"), MANAGER("ROLE_MANAGER");

    private final String key;
}
