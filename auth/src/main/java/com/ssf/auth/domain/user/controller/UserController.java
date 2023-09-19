package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.dto.UserSignUpDto;
import com.ssf.auth.domain.user.service.UserService;
import jakarta.ws.rs.GET;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
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
}
