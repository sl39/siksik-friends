package com.ssf.member.domain.userachievement.controller;

import com.ssf.member.domain.userachievement.UserAchievement;
import com.ssf.member.domain.userachievement.service.UserAchievementFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class UserAchievementController {

    private final UserAchievementFindService userAchievementFindService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/")
    public List<UserAchievement> findUserAchievement(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return userAchievementFindService.findAchievement(accessHeader);
    }

    @PostMapping("/{achievementId}")
    public void createUserAchievement(@RequestHeader(ACCESS_HEADER) String accessHeader, @PathVariable Integer achievementId) {

    }
}
