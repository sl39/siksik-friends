package com.ssf.member.domain.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserRemoveServiceImpl implements UserRemoveService {

    private final RedisTemplate redisTemplate;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";
    private static final String KEY = "rank";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public void removeUser(String accessHeader) {
        Long userId = userRepository.findById(Long
                        .parseLong(JWT
                                .require(Algorithm.HMAC512(secretKey))
                                .build()
                                .verify(accessHeader
                                        .replace(BEARER, ""))
                                .getClaim(ID_CLAIM)
                                .toString()))
                .orElseThrow().getId();

        redisTemplate.opsForZSet().remove(KEY, String.valueOf(userId));
        friendRepository.deleteByToUserId(userId);
        friendRepository.deleteByUser_Id(userId);
        userRepository.deleteById(userId);
    }
}
