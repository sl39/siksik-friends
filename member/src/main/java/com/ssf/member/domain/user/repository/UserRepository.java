package com.ssf.member.domain.user.repository;

import com.ssf.member.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);
    Optional<User> findByNickname(String nickname);
    void deleteById(Long id);
}
