package com.ssf.member.domain.maxDate.controller;

import com.ssf.member.domain.maxDate.service.MaxDateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user/max-date")
@Slf4j
@RequiredArgsConstructor
public class MaxDateController {

    private final MaxDateService maxDateService;

    @GetMapping("")
    public Map<String, String> findMaxDate() {
        Map<String, String> map = new HashMap<>();
        map.put("maxDate", maxDateService.findMaxDate());

        return map;
    }

    @PutMapping("")
    public String changeMaxDate(@RequestBody Map<String, String> date) {
        maxDateService.changeMaxDate(date.get("date"));
        return "변경 완료";
    }
}
