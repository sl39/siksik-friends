package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.dto.UserResponse;

import java.util.List;

public interface UserFindService {

    UserResponse.EmailRedundancy checkEmailDuplication(UserRequest.Email email);
    UserResponse.NicknameRedundancy checkNicknameDuplication(UserRequest.Nickname nickname);
    UserDto.Response findMyInfo(String accessHeader);
    UserDto.Response findUser(Long id);
    UserDto.Response findNickname(String nickname);
    Long findRank(Long id);
    List<UserDto.Response> findRankList();
}
