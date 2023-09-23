package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;

public interface UserFindService {

    public UserDto.Detail findUser(Long id);
}
