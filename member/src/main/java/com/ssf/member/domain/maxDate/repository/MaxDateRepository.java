package com.ssf.member.domain.maxDate.repository;

import com.ssf.member.domain.maxDate.MaxDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaxDateRepository extends JpaRepository<MaxDate, Long> {

    Optional<MaxDate> findMaxDateById(Long id);
}
