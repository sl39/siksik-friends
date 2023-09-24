package com.ssf.auth.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDto {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Request {
        private String email;
        private String password;
        private String nickname;
        private String profile;
    }
}
