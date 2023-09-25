package com.ssf.member.domain.user.controller;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.service.UserFindService;
import com.ssf.member.domain.user.service.UserModifyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserFindService userFindService;
    private final UserModifyService userModifyService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/my-info")
    public UserDto.Response findMyInfo(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return userFindService.findMyInfo(accessHeader);
    }

    @GetMapping("/{id}")
    public UserDto.Response findUserDetail(@PathVariable Long id) {
        return userFindService.findUser(id);
    }

    @PutMapping("/{id}")
    public void modifyUser(@PathVariable Long id, @RequestBody UserDto.Request request) {
        userModifyService.modifyUser(id, request);
    }

    @GetMapping("/rank")
    public List<UserDto.Response> rankList() {
        return userFindService.findRankList();
    }
}
