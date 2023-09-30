package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserRequest;

public interface UserAddService {

    void addUser(UserRequest.SignUp signUpDto);
}
