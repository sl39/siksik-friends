package com.ssf.auth.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpDto {

    private String email;
    private String password;
    private String nickname;
    private String profile;
}
