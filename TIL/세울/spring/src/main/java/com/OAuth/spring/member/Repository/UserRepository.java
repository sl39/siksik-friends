package com.OAuth.spring.member.Repository;

import com.OAuth.spring.member.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
}
