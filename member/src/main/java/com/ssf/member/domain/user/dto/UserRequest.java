package com.ssf.member.domain.user.dto;

import lombok.Builder;

public record UserRequest() {

    @Builder
    public record AccessHeader(String accessHeader) {}

    @Builder
    public record UserId(long id) {}
}
