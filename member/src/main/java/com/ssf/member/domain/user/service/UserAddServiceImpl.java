package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.domain.Role;
import com.ssf.member.domain.user.domain.User;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.repository.UserRepository;
import com.ssf.member.global.common.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserAddServiceImpl implements UserAddService {

    private final RedisTemplate<String, String> redisTemplate;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void addUser(UserRequest.SignUp signUpDto) {
        User user = User.builder()
                .email(signUpDto.getEmail())
                .password(signUpDto.getPassword())
                .nickname(signUpDto.getNickname())
                .profile(signUpDto.getProfile())
                .role(Role.USER)
                .build();

        user.encodePassword(passwordEncoder);
        userRepository.save(user);

        redisTemplate.opsForZSet().add(Constants.RANK_KEY.getValue(), String.valueOf(user.getId()), 1000);
    }
}
