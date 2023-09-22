package com.ssf.gateway.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Optional;

@FeignClient(value = "auth-service", path = "/api/auth")
public interface AuthClient {

    @PostMapping("/credentials")
    public Optional<String> credentials(@RequestHeader String Authorization);
}
