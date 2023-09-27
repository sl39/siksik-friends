package com.ssf.auth.domain.refreshtoken.service;

import com.ssf.auth.domain.refreshtoken.dto.RefreshTokenDto;

public interface RefreshTokenService {

    void createRefreshToken(RefreshTokenDto.Request request);
    void findRefreshToken(RefreshTokenDto.Request request);
}
