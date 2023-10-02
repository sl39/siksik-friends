package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.dto.UserResponse;

public interface UserService {

    UserResponse.EmailRedundancy checkEmailDuplication(UserRequest.Email email);
    UserResponse.NicknameRedundancy checkNicknameDuplication(UserRequest.Nickname nickname);
    public void signUp(UserDto.Request userRequest) throws Exception;
    public void signOut(String accessHeader);
}
