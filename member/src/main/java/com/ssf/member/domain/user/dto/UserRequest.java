package com.ssf.member.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

public class UserRequest {

    @Getter
    @Builder
    public static class SignIn {

        private String email;
        private String password;
        private String nickname;
        private String profile;

        public void changeProfile(String profile) {
            this.profile = profile;
        }
    }
}
