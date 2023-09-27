package com.ssf.member.domain.userachievement.service;

import com.ssf.member.domain.userachievement.UserAchievement;
import com.ssf.member.domain.userachievement.repository.UserAchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAchievementFindServiceImpl implements UserAchievementFindService {

    private final UserAchievementRepository userAchievementRepository;

    @Override
    public List<UserAchievement> findAchievement(Long id) {
        return userAchievementRepository.findAllByUser_Id(id);
    }
}
