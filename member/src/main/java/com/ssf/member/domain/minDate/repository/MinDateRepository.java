package com.ssf.member.domain.minDate.repository;

import com.ssf.member.domain.minDate.MinDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MinDateRepository extends JpaRepository<MinDate, Long> {

    Optional<MinDate> findMinDateById(Long id);
}
