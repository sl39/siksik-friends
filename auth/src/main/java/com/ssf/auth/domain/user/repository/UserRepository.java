package com.ssf.auth.domain.user.repository;

import com.ssf.auth.domain.user.enums.SocialType;
import com.ssf.auth.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAndSocialType(final String email, final SocialType socialType);
}
