package com.ssf.member.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;

public class UserRequest {

    @Getter
    @Builder
    public static class Email {

        @NotBlank(message = "이메일은 필수 입력 값입니다.")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
        private String email;
    }

    @Getter
    @Builder
    public static class Nickname {

        @NotBlank(message = "닉네임은 필수 입력 값입니다.")
        private String nickname;
    }

    @Getter
    @Builder
    public static class SignUp {

        private String email;
        private String password;
        private String nickname;
        private String profile;

        public void changeProfile(String profile) {
            this.profile = profile;
        }
    }
}
