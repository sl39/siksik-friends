package com.ssf.member.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;

public record UserRequest() {

    @Builder
    public record AccessHeader(String accessHeader) {}
}
