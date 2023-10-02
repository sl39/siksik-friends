package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserRequest;
import com.ssf.auth.domain.user.dto.UserResponse;
import com.ssf.auth.global.jwt.dto.JwtDto;

public interface UserService {

    UserResponse.EmailRedundancy checkEmailDuplication(UserRequest.Email email);
    UserResponse.NicknameRedundancy checkNicknameDuplication(UserRequest.Nickname nickname);
    void addUser(UserRequest.SignUp signUpDto);
    void signOut(JwtDto jwtDto);
}
