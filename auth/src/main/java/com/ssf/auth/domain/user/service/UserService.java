package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserSignInDto;
import com.ssf.auth.domain.user.dto.UserSignUpDto;

public interface UserService {

    public void signUp(UserSignUpDto userSignUpDto) throws Exception;
    public void validEmail(String email) throws Exception;
    public void ValidNickname(String nickname) throws Exception;
    public void signIn(UserSignInDto userSignInDto) throws Exception;
}
