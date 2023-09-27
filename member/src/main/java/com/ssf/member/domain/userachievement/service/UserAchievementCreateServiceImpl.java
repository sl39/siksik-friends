package com.ssf.member.domain.userachievement.service;

import com.ssf.member.domain.achievement.repository.AchievementRepository;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.repository.UserRepository;
import com.ssf.member.domain.userachievement.UserAchievement;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAchievementCreateServiceImpl implements UserAchievementCreateService {

    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;

    @Override
    public void createUserAchievement(Long userId, Integer achievementId) {
        User user = userRepository.findById(userId).orElseThrow();
        UserAchievement.builder()
                .user(user)
                .achievement(achievementRepository.findByAchievementId(achievementId))
                .build();
    }
}
