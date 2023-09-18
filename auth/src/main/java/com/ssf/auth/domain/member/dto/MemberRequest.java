package com.ssf.auth.domain.member.dto;

import com.ssf.auth.domain.member.enums.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class MemberRequest {

    private final String email;
    private final SocialType socialType;
}
