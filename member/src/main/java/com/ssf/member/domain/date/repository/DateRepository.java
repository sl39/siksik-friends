package com.ssf.member.domain.date.repository;

import com.ssf.member.domain.date.Date;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DateRepository extends JpaRepository<Date, Long> {

    Optional<Date> findDateById(Long id);
}
