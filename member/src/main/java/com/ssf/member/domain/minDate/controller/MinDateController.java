package com.ssf.member.domain.minDate.controller;

import com.ssf.member.domain.minDate.service.MinDateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user/min-date")
@Slf4j
@RequiredArgsConstructor
public class MinDateController {

    private final MinDateService minDateService;

    @GetMapping("")
    public Map<String, String> findMinDate() {
        Map<String, String> map = new HashMap<>();
        map.put("minDate", minDateService.findMinDate());

        return map;
    }

    @PutMapping("")
    public String changeMinDate(@RequestBody Map<String, String> date) {
        minDateService.changeMinDate(date.get("date"));
        return "변경 완료";
    }
}
