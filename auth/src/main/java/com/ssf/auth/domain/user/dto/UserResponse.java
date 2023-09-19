package com.ssf.auth.domain.user.dto;

import com.ssf.auth.domain.user.enums.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class UserResponse {

    private final String email;
    private final SocialType socialType;
}
