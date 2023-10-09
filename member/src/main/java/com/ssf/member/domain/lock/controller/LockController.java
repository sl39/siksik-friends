package com.ssf.member.domain.lock.controller;

import com.ssf.member.domain.lock.service.LockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user/lock")
@Slf4j
@RequiredArgsConstructor
public class LockController {

    private final LockService lockService;

    @GetMapping("")
    public Map<String, Boolean> isLock() {
        Map<String, Boolean> map = new HashMap<>();
        map.put("isLock", lockService.isLock());

        return map;
    }

    @PutMapping("")
    public String changeLock() {
        lockService.changeStatus();

        return "변경 완료";
    }
}
