package com.ssf.auth.global.jwt.dto;

import lombok.Builder;

@Builder
public record JwtDto(
        String accessToken,
        String id,
        long exp
) {}
