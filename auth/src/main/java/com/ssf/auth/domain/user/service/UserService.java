package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserDto;

public interface UserService {

    public void signUp(UserDto.Request userRequest) throws Exception;
    public void validEmail(String email) throws Exception;
    public void ValidNickname(String nickname) throws Exception;
}
