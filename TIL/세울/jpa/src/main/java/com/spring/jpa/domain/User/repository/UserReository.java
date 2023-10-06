package com.spring.jpa.domain.User.repository;

import com.spring.jpa.domain.User.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReository extends JpaRepository<SiteUser, Long> {

}
