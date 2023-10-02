package com.ssf.auth.domain.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssf.auth.domain.user.domain.Role;
import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.domain.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RedisTemplate redisTemplate;
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
