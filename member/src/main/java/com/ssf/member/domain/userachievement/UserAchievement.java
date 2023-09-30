package com.ssf.member.domain.userachievement;

import com.ssf.member.domain.achievement.Achievement;
import com.ssf.member.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_achievement")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserAchievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_achievement_id")
    private Long userAchievementId;

    @ManyToOne
    @JoinColumn(name = "member")
    private User user;

    @ManyToOne
    @JoinColumn(name = "achievement")
    private Achievement achievement;
}
