package com.ssf.domain.Member.achievements.repository;

import com.ssf.domain.Member.achievements.entity.UserAchievements;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAchievementsRepository extends JpaRepository<UserAchievements,Long> {
}
