package com.ssf.member.domain.userachievement.controller;

import com.ssf.member.domain.userachievement.UserAchievement;
import com.ssf.member.domain.userachievement.service.UserAchievementFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
