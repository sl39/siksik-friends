package com.ssf.member.domain.userachievement.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.user.repository.UserRepository;
import com.ssf.member.domain.userachievement.UserAchievement;
import com.ssf.member.domain.userachievement.repository.UserAchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAchievementFindServiceImpl implements UserAchievementFindService {

    private final UserAchievementRepository userAchievementRepository;
    private final UserRepository userRepository;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public List<UserAchievement> findAchievement(String accessHeader) {
        System.out.println(accessHeader);

        Long id = Long
                .parseLong(JWT
                        .require(Algorithm.HMAC512(secretKey))
                        .build()
                        .verify(accessHeader
                                .replace(BEARER, ""))
                        .getClaim(ID_CLAIM)
                        .toString());

        return userAchievementRepository.findAllByUser_Id(id);
    }
}
