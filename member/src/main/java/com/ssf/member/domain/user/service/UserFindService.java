package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserFindService {

    public UserDto.Response findMyInfo(String accessHeader);
    public UserDto.Response findUser(Long id);
    public UserDto.Response findNickname(String nickname);
    public Long findRank(Long id);
    public List<UserDto.Response> findRankList();
}
