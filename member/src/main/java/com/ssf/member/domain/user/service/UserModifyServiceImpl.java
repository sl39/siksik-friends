package com.ssf.member.domain.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class UserModifyServiceImpl implements UserModifyService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public void modifyUser(String accessHeader, UserDto.Request request) throws Exception {
        User user = userRepository.findById(Long
                        .parseLong(JWT
                                .require(Algorithm.HMAC512(secretKey))
                                .build()
                                .verify(accessHeader
                                        .replace(BEARER, ""))
                                .getClaim(ID_CLAIM)
                                .toString()))
                .orElseThrow();

        if (StringUtils.hasText(request.getNickname())) {
            user.changeNickname(request.getNickname());
        }

        if (StringUtils.hasText(request.getPassword())) {
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new Exception("비밀번호 틀려쪙");
            }

            user.changePassword(request.getChangePassword());
            user.encodePassword(passwordEncoder);
        }

        if (StringUtils.hasText(request.getProfile())) {
            user.changeProfile(request.getProfile());
        }
    }
}
