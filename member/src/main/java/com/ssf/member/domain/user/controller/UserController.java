package com.ssf.member.domain.user.controller;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.dto.UserResponse;
import com.ssf.member.domain.user.service.*;
import com.ssf.member.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtService jwtService;
    private final UserFindService userFindService;
    private final UserModifyService userModifyService;
    private final UserRemoveService userRemoveService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/my-info")
    public ResponseEntity<UserResponse.MyInfo> findUser(
            @RequestHeader(ACCESS_HEADER) final UserRequest.AccessHeader accessHeader
    ) {
        return ResponseEntity.ok(userFindService.findUser(jwtService.extractHeader(accessHeader)));
    }

    @GetMapping("/{userId}")
    public UserDto.Response findUserById(@PathVariable UserRequest.UserId userId) {
//        return userFindService.findUserById(userId);
        return null;
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
