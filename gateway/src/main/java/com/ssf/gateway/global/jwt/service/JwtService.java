package com.ssf.gateway.global.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Getter
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.header}")
    private String accessHeader;

    private static final String AUTH_TYPE = "Bearer ";

    private final RedisTemplate<String, String> redisTemplate;

    public String extractToken(HttpHeaders headers) {
        return headers.getFirst(accessHeader);
    }

    public String extractAccessToken(String token) {
        return token.replace(AUTH_TYPE, "");
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasAccessHeader(HttpHeaders headers) {
        return headers.containsKey(accessHeader);
    }

    public boolean hasAuthType(String token) {
        return token.startsWith(AUTH_TYPE);
    }

    public boolean hasKeyBlackList(String accessToken) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(accessToken));
    }
}
