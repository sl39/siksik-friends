package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.domain.Message;
import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.service.UserService;
import com.ssf.auth.global.jwt.dto.JwtDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private static final String ACCESS_HEADER = "Authorization";
    private static final String DEFAULT_PROFILE_URL = "/images/character/rabbit.png";

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
