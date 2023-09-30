package com.ssf.member.domain.user.service;

import com.ssf.member.global.common.Constants;
import com.ssf.member.global.jwt.dto.JwtDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserSaveServiceImpl implements UserSaveService {

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void signOut(JwtDto accessHeader) {
        redisTemplate.delete(accessHeader.id());
        redisTemplate.opsForValue().set(accessHeader.accessToken(),
                Constants.BLACK_LIST.getValue(), accessHeader.exp(), TimeUnit.MILLISECONDS);
    }
}
