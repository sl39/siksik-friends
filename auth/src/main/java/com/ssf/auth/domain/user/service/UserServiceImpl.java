package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.domain.Role;
import com.ssf.auth.domain.user.domain.User;
import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.dto.UserResponse;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.dto.JwtDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RedisTemplate<String, String> redisTemplate;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private static final String RANK_KEY = "rank";
    private static final String BLACK_LIST = "blackList";

    @Override
    public UserResponse.EmailRedundancy checkEmailDuplication(UserRequest.Email email) {
        return UserResponse.EmailRedundancy.builder()
                .emailRedundancyStatus(userRepository.existsByEmail(email.email()))
                .build();
    }

    @Override
    public UserResponse.NicknameRedundancy checkNicknameDuplication(UserRequest.Nickname nickname) {
        return UserResponse.NicknameRedundancy.builder()
                .nicknameRedundancyStatus(userRepository.existsByNickname(nickname.nickname()))
                .build();
    }

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

        redisTemplate.opsForZSet().add(RANK_KEY, String.valueOf(user.getId()), 1000);
    }

    @Override
    public void signOut(JwtDto accessHeader) {
        User user = userRepository.findById(Long.parseLong(accessHeader.id())).orElseThrow();
        user.changeActivated();

        redisTemplate.delete(accessHeader.id());
        redisTemplate.opsForValue().set(accessHeader.accessToken(),
                BLACK_LIST, accessHeader.exp(), TimeUnit.MILLISECONDS);
    }
}
