package com.ssf.member.domain.achievement;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id")
    private Integer achievementId;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 255)
    private String content;
}
