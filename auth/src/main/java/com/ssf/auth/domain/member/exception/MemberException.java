package com.ssf.auth.domain.member.exception;

import com.ssf.auth.domain.member.enums.MemberErrorResult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberException extends RuntimeException {

    private final MemberErrorResult errorResult;
}
