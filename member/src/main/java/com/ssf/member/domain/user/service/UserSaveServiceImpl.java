package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.domain.User;
import com.ssf.member.domain.user.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    public void signOut(JwtDto accessHeader) {
        User user = userRepository.findById(Long.parseLong(accessHeader.id())).orElseThrow();
        user.changeActivated();

        redisTemplate.delete(accessHeader.id());
        redisTemplate.opsForValue().set(accessHeader.accessToken(),
                Constants.BLACK_LIST.getValue(), accessHeader.exp(), TimeUnit.MILLISECONDS);
    }
}
