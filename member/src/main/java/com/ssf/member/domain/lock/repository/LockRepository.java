package com.ssf.member.domain.lock.repository;

import com.ssf.member.domain.lock.Lock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LockRepository extends JpaRepository<Lock, Long> {

    Optional<Lock> findLockById(Long id);
}
