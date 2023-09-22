package com.ssf.auth.domain.jwt.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class JwtController {

    @PostMapping("/credentials")
    public String credentials(@RequestHeader("Authorization") String authorization) {
        System.out.println("Authorization : " + authorization);
        return "test";
    }
}
