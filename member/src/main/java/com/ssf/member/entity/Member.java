package com.ssf.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;


@Entity
@Table
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String nickname;

    @Column
    private int score;

    @Column
    private boolean activated;

    @Column
    private String profile;

    @Column
    private String role;

    @Column
    private String social_type;

    @Column
    private String sign_up_at;

    @Column
    private String update_at;

}
