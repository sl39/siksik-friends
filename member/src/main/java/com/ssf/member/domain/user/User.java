package com.ssf.member.domain.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class User {

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
        if (!memberUpdateDTO.getEmail().isEmpty()) {
            this.email = memberUpdateDTO.getEmail();
        }

        if (!memberUpdateDTO.getNickname().isEmpty()) {
            this.nickname = memberUpdateDTO.getNickname();
        }

        if (!memberUpdateDTO.getPassword().isEmpty()) {
            this.password = memberUpdateDTO.getPassword();
        }

        if (!memberUpdateDTO.getNickname().isEmpty()) {
            this.profile = memberUpdateDTO.getProfile();
        }
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
}
