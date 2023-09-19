package com.ssf.auth.domain.user;

import com.ssf.auth.domain.user.enums.Role;
import com.ssf.auth.domain.user.enums.SocialType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 320)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 16)
    private String nickname;

    @Column(nullable = false)
    @ColumnDefault("1000")
    private int score;

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
