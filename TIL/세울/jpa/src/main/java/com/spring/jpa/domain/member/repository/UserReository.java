package com.spring.jpa.domain.member.repository;

import com.spring.jpa.domain.member.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReository extends JpaRepository<SiteUser, Long> {

}
