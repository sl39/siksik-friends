package com.ssf.member.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

public class UserResponse {

    @Getter
    @Builder
    public static class EmailRedundancy {

        private Boolean emailRedundancyStatus;
    }

    @Getter
    @Builder
    public static class NicknameRedundancy {

        private Boolean nicknameRedundancyStatus;
    }
}
