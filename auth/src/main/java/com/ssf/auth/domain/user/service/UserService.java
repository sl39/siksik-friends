package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserSignUpDto;

public interface UserService {

    public void signUp(UserSignUpDto userSignUpDto) throws Exception;
}
