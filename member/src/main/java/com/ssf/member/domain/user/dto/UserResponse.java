package com.ssf.member.domain.user.dto;

import lombok.Builder;

public record UserResponse() {

    @Builder
    public record MyInfo(

            long user_id,
            String email,
            String nickname,
            String profile,
            long rank,
            int level,
            long exp,
            String odds
    ) {}
}
