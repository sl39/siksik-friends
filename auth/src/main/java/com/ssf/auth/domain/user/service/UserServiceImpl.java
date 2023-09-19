package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserSignInDto;
import com.ssf.auth.domain.user.dto.UserSignUpDto;
import com.ssf.auth.domain.user.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .profile(userSignUpDto.getProfile())
                .build();

//        user.encodePassword(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public void validEmail(String email) throws Exception {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }
    }

    @Override
    public void ValidNickname(String nickname) throws Exception {
        if (userRepository.findByNickname(nickname).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }
    }

    @Override
    public void signIn(UserSignInDto userSignInDto) throws Exception {
        if (userRepository.findByEmail(userSignInDto.getEmail()).isEmpty()) {
            throw new Exception("이메일 또는 비밀번호를 확인하세요.");
        }

        User input = User.builder()
                .password(userSignInDto.getPassword())
                .build();

//        input.encodePassword(passwordEncoder);
        String password = userRepository.findAllByEmail(userSignInDto.getEmail()).get().getPassword();

        if (!password.equals(input.getPassword())) {
            throw new Exception("이메일 또는 비밀번호를 확인하세요.");
        }
    }
}
