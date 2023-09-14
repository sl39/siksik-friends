package com.example.demo.domain.repository;

import com.example.demo.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepsitory extends JpaRepository<Member,Long>{
    boolean existsByEmail(String email);
}
