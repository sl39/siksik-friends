package com.ssf.member.domain.achievement.repository;

import com.ssf.member.domain.achievement.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Integer> {

    Achievement findByAchievementId(Integer id);
}
