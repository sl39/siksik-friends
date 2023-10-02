package com.ssf.auth.domain.user.repository;

import com.ssf.auth.domain.user.domain.SocialType;
import com.ssf.auth.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    Optional<User> findByEmail(String email);
    Optional<User> findByRefreshToken(String refreshToken);
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
}
