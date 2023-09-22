package com.ssf.domain.Member.Member.entity;

import com.ssf.domain.Member.Member.entity.dto.MemberUpdateDTO;
import com.ssf.domain.Member.Member.enums.Role;
import com.ssf.domain.Member.Member.enums.SocialType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 320, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 16,unique = true)
    private String nickname;

    @Column(nullable = false)
    @ColumnDefault("1000")
    private Long score;

    @Column(nullable = false, length = 255)
    @Builder.Default
    private String profile = "/profile.png";

    @CreationTimestamp
    @Column(nullable = false, length = 20, updatable = false)
    private LocalDateTime signUpAt;

    @UpdateTimestamp
    @Column(nullable = false, length = 20)
    private LocalDateTime updateAt;

    @Column(nullable = false, length = 20)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.GUEST;

    @Column(nullable = false, length = 10)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private SocialType socialType = SocialType.NONE;

    private String socialId;

    private String refreshToken;

    public void update(MemberUpdateDTO memberUpdateDTO) {
        this.email = memberUpdateDTO.getEmail();
        this.password = memberUpdateDTO.getPassword();
        this.nickname = memberUpdateDTO.getNickname();
        this.profile = memberUpdateDTO.getProfile();
        this.role = Role.MANAGER;
    }
}
