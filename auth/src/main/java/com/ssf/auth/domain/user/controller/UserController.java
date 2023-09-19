package com.ssf.auth.domain.user.controller;

import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import static com.ssf.auth.domain.user.header.UserConstants.USER_ID_HEADER;

@RestController
public class UserController {

    @PostMapping("/api/v1/member")
    public ResponseEntity<UserResponse> createMember (
            @RequestHeader(USER_ID_HEADER) final String id,
            @RequestBody final UserRequest memberRequest) {

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
