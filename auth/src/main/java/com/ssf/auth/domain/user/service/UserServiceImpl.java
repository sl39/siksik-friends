package com.ssf.auth.domain.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssf.auth.domain.user.domain.Role;
import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.domain.User;
import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.dto.UserResponse;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.common.CommonConstants;
import com.ssf.auth.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String ID_CLAIM = "id";
    private static final String KEY = "rank";
    private static final String BEARER = "Bearer ";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

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

        redisTemplate.opsForZSet().add(CommonConstants.RANK_KEY.getValue(), String.valueOf(user.getId()), 1000);
    }

    public void signOut(String accessHeader) {
        String accesssToken = Optional.ofNullable(accessHeader)
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, "")).orElse(null);

        if (!jwtService.isTokenValid(accesssToken)) {
            System.out.println("잘못된 요청입니다.");
            return;
        }

        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(secretKey))
                .build()
                .verify(accesssToken);

        String id = decodedJWT.getClaim(ID_CLAIM).toString();
        Long expiration = decodedJWT.getClaim("exp").asLong() * 1000;
        Long now = System.currentTimeMillis();

        redisTemplate.opsForValue().set(accesssToken, "sign-out", expiration - now, TimeUnit.MILLISECONDS);
        redisTemplate.delete(id);
    }
}
