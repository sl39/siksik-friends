package com.ssf.member.domain.user.controller;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.service.UserFindService;
import com.ssf.member.domain.user.service.UserModifyService;
import com.ssf.member.domain.user.service.UserRemoveService;
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
    private final UserRemoveService userRemoveService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/my-info")
    public UserDto.Response findMyInfo(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return userFindService.findMyInfo(accessHeader);
    }

    @GetMapping("/{id}")
    public UserDto.Response findUserDetail(@PathVariable Long id) {
        return userFindService.findUser(id);
    }

    @GetMapping("/")
    public UserDto.Response findUserToNickname(String nickname) {
        return userFindService.findNickname(nickname);
    }

    @PutMapping("/")
    public void modifyUser(@RequestHeader(ACCESS_HEADER) String accessHeader, @RequestBody UserDto.Request request) throws Exception {
        userModifyService.modifyUser(accessHeader, request);
    }

    @GetMapping("/rank")
    public List<UserDto.Response> rankList() {
        return userFindService.findRankList();
    }

    @DeleteMapping("/")
    public String removeUser(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        userRemoveService.removeUser(accessHeader);
        return "회원 탈퇴 완료";
    }
}
