package com.ssf.member.domain.userachievement.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.achievement.repository.AchievementRepository;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.repository.UserRepository;
import com.ssf.member.domain.userachievement.UserAchievement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAchievementCreateServiceImpl implements UserAchievementCreateService {

    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public void createUserAchievement(String accessHeader, Integer achievementId) {
        User user = userRepository.findById(Long
                .parseLong(JWT
                        .require(Algorithm.HMAC512(secretKey))
                        .build()
                        .verify(accessHeader
                                .replace(BEARER, ""))
                        .getClaim(ID_CLAIM)
                        .toString()))
                .orElseThrow();

        UserAchievement.builder()
                .user(user)
                .achievement(achievementRepository.findByAchievementId(achievementId))
                .build();
    }
}
