package com.ssf.member.domain.date.controller;

import com.ssf.member.domain.date.service.DateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user/date")
@Slf4j
@RequiredArgsConstructor
public class DateController {

    private final DateService dateService;

    @GetMapping("")
    public Map<String, String> findMinDate() {
        return dateService.findDate();
    }

    @PutMapping("")
    public String changeMinDate(@RequestBody Map<String, String> date) {
        dateService.changeDate(date);
        return "변경 완료";
    }
}
