package com.ssf.member.domain.lock.service;

import com.ssf.member.domain.lock.Lock;
import com.ssf.member.domain.lock.repository.LockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class LockServiceImpl implements LockService {

    private final LockRepository lockRepository;

    @Override
    public boolean isLock() {
        return lockRepository.findLockById(1L).get().isLock();
    }

    @Override
    public void changeStatus() {
        Lock lock = lockRepository.findLockById(1L).get();
        lock.changeLock();
    }
}
