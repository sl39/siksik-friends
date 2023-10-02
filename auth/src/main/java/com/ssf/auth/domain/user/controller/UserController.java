package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.domain.Message;
import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/email")
    public ResponseEntity<Message> checkEmail(@Validated final UserRequest.Email emailDto) {
        return userService.checkEmailDuplication(emailDto).emailRedundancyStatus()
                ? ResponseEntity.status(HttpStatus.CONFLICT).body(Message.IMPOSSIBLE_EMAIL)
                : ResponseEntity.ok(Message.IMPOSSIBLE_EMAIL);
    }

    @GetMapping("/nickname")
    public ResponseEntity<Message> checkNickname(@Validated final UserRequest.Nickname nicknameDto) {
        return userService.checkNicknameDuplication(nicknameDto).nicknameRedundancyStatus()
                ? ResponseEntity.status(HttpStatus.CONFLICT).body(Message.IMPOSSIBLE_NICKNAME)
                : ResponseEntity.ok(Message.POSSIBLE_NICKNAME);
    }

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserDto.Request userRequest) throws Exception {
        userService.signUp(userRequest);
        return "회원가입 성공";
    }

    @GetMapping("/sign-out")
    public String signOut(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        userService.signOut(accessHeader);
        return "로그아웃 완료";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
