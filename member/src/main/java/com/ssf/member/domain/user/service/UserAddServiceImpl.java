package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.domain.Role;
import com.ssf.member.domain.user.domain.User;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssf.member.global.common.Constants.RANK_KEY;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserAddServiceImpl implements UserAddService {

    private final RedisTemplate<String, String> redisTemplate;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void addUser(UserRequest.SignIn signInDto) {
        User user = User.builder()
                .email(signInDto.getEmail())
                .password(signInDto.getPassword())
                .nickname(signInDto.getNickname())
                .profile(signInDto.getProfile())
                .role(Role.USER)
                .build();

        user.encodePassword(passwordEncoder);
        userRepository.save(user);

        redisTemplate.opsForZSet().add(RANK_KEY, String.valueOf(user.getId()), 1000);
    }
}
