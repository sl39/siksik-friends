package com.ssf.domain.Member.achievements.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Achievements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)

    private String name;

    @Column(length = 500, nullable = false)
    private String content;

//    @OneToMany(mappedBy = "achievements")
//    private List<UserAchievements> userAchievementsList = new ArrayList<>();
}
