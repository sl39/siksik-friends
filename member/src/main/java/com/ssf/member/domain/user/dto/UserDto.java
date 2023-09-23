package com.ssf.member.domain.user.dto;

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
    public static class Detail {

        private String email;
        private String nickname;
        private String profile;
        private int level;
        private Long rank;
        private int score;
        private Long odds;
    }
}
