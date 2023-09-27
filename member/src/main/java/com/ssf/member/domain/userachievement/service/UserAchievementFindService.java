package com.ssf.member.domain.userachievement.service;

import com.ssf.member.domain.userachievement.UserAchievement;

import java.util.List;

public interface UserAchievementFindService {

    List<UserAchievement> findAchievement(Long id);
}
