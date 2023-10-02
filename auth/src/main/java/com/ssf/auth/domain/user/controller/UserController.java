package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.service.UserService;
import com.ssf.auth.global.common.ValidationSequence;
import com.ssf.auth.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.ssf.auth.domain.user.domain.Message.*;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final JwtService jwtService;
    private final UserService userService;

    private static final String DEFAULT_PROFILE_URL = "/images/character/rabbit.png";
    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/email")
    public ResponseEntity<String> checkEmail(
            @Validated(ValidationSequence.class) final UserRequest.Email emailDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        }

        return userService.checkEmailDuplication(emailDto).emailRedundancyStatus()
                ? ResponseEntity.badRequest().body(USING_EMAIL.getValue())
                : ResponseEntity.ok(POSSIBLE_EMAIL.getValue());
    }

    @GetMapping("/nickname")
    public ResponseEntity<String> checkNickname(
            @Validated(ValidationSequence.class) final UserRequest.Nickname nicknameDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        }

        return userService.checkNicknameDuplication(nicknameDto).nicknameRedundancyStatus()
                ? ResponseEntity.badRequest().body(USING_NICKNAME.getValue())
                : ResponseEntity.ok(POSSIBLE_NICKNAME.getValue());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> signIn(
            @Validated(ValidationSequence.class) @RequestBody final UserRequest.SignUp signUpDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        }

        if (!StringUtils.hasText(signUpDto.getProfile())) {
            signUpDto.changeProfile(DEFAULT_PROFILE_URL);
        }

        userService.addUser(signUpDto);
        return ResponseEntity.ok().body(SIGN_UP_SUCCESS.getValue());
    }

    @GetMapping("/sign-out")
    public ResponseEntity<String> signOut(@RequestHeader(ACCESS_HEADER) final UserRequest.AccessHeader accessHeader) {
        userService.signOut(jwtService.extractHeader(accessHeader));
        return ResponseEntity.ok().body(SIGN_OUT_SUCCESS.getValue());
    }

    @GetMapping("/access-token")
    public ResponseEntity<String> reIssuanceAccessToken(
            @RequestHeader(ACCESS_HEADER) final UserRequest.AccessHeader accessHeader
    ) {
        return ResponseEntity.ok()
                .header(ACCESS_HEADER, jwtService.reIssuanceAccessToken(accessHeader))
                .body(RE_ISSUANCE_ACCESS_TOKEN_SUCCESS.getValue());
    }
}
