package com.ssf.member.domain.lock.service;

public interface LockService {

    boolean isLock();
    void changeStatus();
}
