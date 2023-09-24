package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserFindService {

        public UserDto.Response findMyInfo(HttpServletRequest request);
    public UserDto.Detail findUser(Long id);
    public List<UserDto.Detail> findUsers();
//    public void test();
}
