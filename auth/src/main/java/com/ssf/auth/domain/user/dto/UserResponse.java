package com.ssf.auth.domain.user.dto;

import lombok.Builder;

public record UserResponse() {

    @Builder
    public record EmailRedundancy(boolean emailRedundancyStatus) {}

    @Builder
    public record NicknameRedundancy(boolean nicknameRedundancyStatus) {}
}
