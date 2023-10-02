package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.service.UserService;
import com.ssf.auth.global.jwt.dto.JwtDto;
import com.ssf.auth.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final JwtService jwtService;
    private final UserService userService;

    private static final String POSSIBLE_EMAIL = "사용 가능한 이메일입니다.";
    private static final String USING_EMAIL = "사용 중인 이메일입니다.";
    private static final String POSSIBLE_NICKNAME = "사용 가능한 닉네임입니다.";
    private static final String USING_NICKNAME = "사용 중인 닉네임입니다.";
    private static final String ACCESS_HEADER = "Authorization";
    private static final String DEFAULT_PROFILE_URL = "/images/character/rabbit.png";

    @GetMapping("/email")
    public ResponseEntity<String> checkEmail(@Validated final UserRequest.Email emailDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        }

        return userService.checkEmailDuplication(emailDto).emailRedundancyStatus()
                ? ResponseEntity.badRequest().body(USING_EMAIL) : ResponseEntity.ok(POSSIBLE_EMAIL);
    }

    @GetMapping("/nickname")
    public ResponseEntity<String> checkNickname(
            @Validated final UserRequest.Nickname nicknameDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        }

        return userService.checkNicknameDuplication(nicknameDto).nicknameRedundancyStatus()
                ? ResponseEntity.badRequest().body(USING_NICKNAME) : ResponseEntity.ok(POSSIBLE_NICKNAME);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signIn(@RequestBody final UserRequest.SignUp signUpDto) {
        if (!StringUtils.hasText(signUpDto.getProfile())) {
            signUpDto.changeProfile(DEFAULT_PROFILE_URL);
        }

        userService.addUser(signUpDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sign-out")
    public ResponseEntity<Void> signOut(@RequestHeader(ACCESS_HEADER) final String accessHeader) {
        JwtDto jwtDto = jwtService.extractHeader(UserRequest.AccessHeader.builder()
                .accessHeader(accessHeader)
                .build());

        userService.signOut(jwtDto);
        return ResponseEntity.ok().build();
    }
}
