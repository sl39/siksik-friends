package com.ssf.auth.domain.member.dto;

import com.ssf.auth.domain.member.enums.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class MemberResponse {

    private final String email;
    private final SocialType socialType;
}
