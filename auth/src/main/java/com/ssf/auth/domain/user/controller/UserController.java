package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.dto.UserSignInDto;
import com.ssf.auth.domain.user.dto.UserSignUpDto;
import com.ssf.auth.domain.user.service.UserService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
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

    @PostMapping("/sign-in")
    public String signIn(@RequestBody UserSignInDto userSignInDto) throws Exception {
        userService.signIn(userSignInDto);
        return "로그인 성공";
    }
}
