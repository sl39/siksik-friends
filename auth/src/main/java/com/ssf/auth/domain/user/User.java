package com.ssf.auth.domain.user;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 320, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 16, unique = true)
    private String nickname;

    @Column(nullable = false)
    @Builder.Default
    private int score = 1000;

    @Column(nullable = false)
    private boolean activated;

    @Column(nullable = false, length = 255)
    @Builder.Default
    private String profile = "/profile.png";

    @Column(nullable = false, length = 20)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.GUEST;

    @Column(name = "social_id")
    private String socialId;

    @Column(name = "social_type", nullable = false, length = 10)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private SocialType socialType = SocialType.NONE;

    @Column(nullable = false)
    @Builder.Default
    private Long rank = 0L;

    @Column(nullable = false)
    @Builder.Default
    private Long win = 0L;

    @Column(name = "total_game", nullable = false)
    @Builder.Default
    private Long totalGame = 0L;

    @Column(nullable = false)
    @Builder.Default
    private int level = 1;

    @Column(nullable = false)
    @Builder.Default
    private Long exp = 0L;

    @CreationTimestamp
    @Column(name = "sign_up_at", nullable = false, length = 20, updatable = false)
    private LocalDateTime signUpAt;

    @UpdateTimestamp
    @Column(name = "update_at", nullable = false, length = 20)
    private LocalDateTime updateAt;

    @Column(name = "refresh_token")
    private String refreshToken;

    public void authorizeUser(Role role) {
        this.role = role;
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
