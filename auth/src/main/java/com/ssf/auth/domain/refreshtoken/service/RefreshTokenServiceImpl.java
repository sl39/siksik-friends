package com.ssf.auth.domain.refreshtoken.service;

import com.ssf.auth.domain.refreshtoken.dto.RefreshTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RedisTemplate redisTemplate;

    @Override
    public void createRefreshToken(RefreshTokenDto.Request request) {
        System.out.println(request.getId());
        System.out.println(request.getRefreshToken());
        redisTemplate.opsForValue().set(request.getId(), request.getRefreshToken(), 30L, TimeUnit.SECONDS);
    }

    @Override
    public void findRefreshToken(RefreshTokenDto.Request request) {
        System.out.println(redisTemplate.opsForValue().get(request.getId()));
    }
}
