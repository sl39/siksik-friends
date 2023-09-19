package com.ssf.auth.domain.user.dto;

import com.ssf.auth.domain.user.enums.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class UserRequest {

    private final String email;
    private final SocialType socialType;
}
