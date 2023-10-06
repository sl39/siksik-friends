package com.ssf.member.global.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.repository.UserRepository;
import com.ssf.member.global.jwt.dto.JwtDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssf.member.global.jwt.domain.JwtConstants.*;

@Service
@Slf4j
@Transactional
@Getter
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final UserRepository userRepository;

    public JwtDto extractHeader(UserRequest.AccessHeader accessHeader) {
        String accessToken = extractAccessToken(accessHeader);
        DecodedJWT decodedJWT = extractJwt(accessToken);

        return JwtDto.builder()
                .accessToken(accessToken)
                .id(extractId(decodedJWT))
                .exp(extractExpiration(decodedJWT))
                .build();
    }

    public String extractAccessToken(UserRequest.AccessHeader accessHeader) {
        return accessHeader.accessHeader().replace(AUTH_TYPE.getValue(), "");
    }

    private DecodedJWT extractJwt(String accessToken) {
        return JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken);
    }

    public String extractId(DecodedJWT decodedJWT) {
        return String.valueOf(decodedJWT.getClaim(ID_CLAIM.getValue()));
    }

    public Long extractExpiration(DecodedJWT decodedJWT) {
        return decodedJWT.getClaim(EXP_CLAIM.getValue()).asLong() * 1000
                - System.currentTimeMillis();
    }
}
