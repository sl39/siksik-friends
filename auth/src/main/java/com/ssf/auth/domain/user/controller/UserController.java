package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserDto.Request userRequest) throws Exception {
        userService.signUp(userRequest);
        return "회원가입 성공";
    }

    @GetMapping("/email")
    public String validEmail(String email) throws Exception {
        userService.validEmail(email);
        return "사용 가능 이메일";
    }

    @GetMapping("/nickname")
    public String validNickname(String nickname) throws Exception {
        userService.ValidNickname(nickname);
        return "사용 가능 닉네임";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
