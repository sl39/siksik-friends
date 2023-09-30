package com.ssf.member.domain.user.service;

import com.ssf.member.global.jwt.dto.JwtDto;

public interface UserSaveService {

    void signOut(JwtDto accessHeader);
}
