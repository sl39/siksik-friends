package com.ssf.auth.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;

public record UserRequest() {

    private static final String IMPOSSIBLE_EMAIL = "이메일 형식이 올바르지 않습니다.";
    private static final String NOT_BLANK_EMAIL = "이메일은 필수 입력 값입니다.";
    private static final String NOT_BLANK_NICKNAME = "닉네임은 필수 입력 값입니다.";
    private static final String REGEXP = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$";

    @Builder
    public record Email(
            @NotBlank(message = NOT_BLANK_EMAIL)
            @Pattern(regexp = REGEXP, message = IMPOSSIBLE_EMAIL)
            String email
    ) {}

    @Builder
    public record Nickname(
            @NotBlank(message = NOT_BLANK_NICKNAME)
            String nickname
    ) {}

    @Getter
    @Builder
    public static class SignUp {

        private final String email;
        private final String password;
        private final String nickname;
        private String profile;

        public void changeProfile(String profile) {
            this.profile = profile;
        }
    }

    @Builder
    public record AccessHeader(String accessHeader) {}
}
