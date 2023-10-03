package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.dto.UserResponse;
import com.ssf.member.global.jwt.dto.JwtDto;

import java.util.List;

public interface UserFindService {

    UserResponse.MyInfo findMyInfo(JwtDto jwtDto);
    UserDto.Response findUser(Long id);
    UserDto.Response findNickname(String nickname);
    Long findRank(Long id);
    List<UserDto.Response> findRankList();
}
