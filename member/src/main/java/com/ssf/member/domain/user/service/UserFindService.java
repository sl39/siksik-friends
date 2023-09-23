package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;

import java.util.List;

public interface UserFindService {

    public UserDto.Detail findUser(Long id);
    public List<UserDto.Detail> findUsers();
}
