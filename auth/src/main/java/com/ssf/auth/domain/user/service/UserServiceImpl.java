package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.Role;
import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RedisTemplate redisTemplate;
    private final PasswordEncoder passwordEncoder;

    private static final String KEY = "rank";

    public void signUp(UserDto.Request userRequest) throws Exception {

        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.existsByNickname(userRequest.getNickname())) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .nickname(userRequest.getNickname())
                .profile(StringUtils.hasText(userRequest.getProfile()) ? userRequest.getProfile() : "/default.png")
                .role(Role.USER)
                .build();

        user.encodePassword(passwordEncoder);
        userRepository.save(user);
        redisTemplate.opsForZSet().add(KEY, String.valueOf(user.getId()), 1000);
    }

    @Override
    public void validEmail(String email) throws Exception {
        if (userRepository.existsByEmail(email)) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }
    }

    @Override
    public void ValidNickname(String nickname) throws Exception {
        if (userRepository.existsByNickname(nickname)) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }
    }
}
