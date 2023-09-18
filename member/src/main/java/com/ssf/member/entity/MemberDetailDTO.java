package com.ssf.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 320)
    private String email;

    @Column(nullable = false, length = 16)
    private String nickname;

    @Column(nullable = false)
    @ColumnDefault("1000L")
    private Long score;

    @Column(nullable = false, length = 255)
    @Builder.Default
    private String profile = "/profile.png";
}
