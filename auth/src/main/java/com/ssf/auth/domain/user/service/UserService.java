package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserDto;
import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.dto.UserResponse;

public interface UserService {

    UserResponse.EmailRedundancy checkEmailDuplication(UserRequest.Email email);
    UserResponse.NicknameRedundancy checkNicknameDuplication(UserRequest.Nickname nickname);
    void addUser(UserRequest.SignUp signUpDto);
    public void signOut(String accessHeader);
}
