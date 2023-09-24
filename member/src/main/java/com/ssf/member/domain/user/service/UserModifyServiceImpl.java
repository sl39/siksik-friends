package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class UserModifyServiceImpl implements UserModifyService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void modifyUser(Long id, UserDto.Request request) {
        User user = userRepository.findById(id).orElseThrow();

        if (StringUtils.hasText(request.getNickname())) {
            user.changeNickname(request.getNickname());
        }

        if (StringUtils.hasText(request.getPassword())) {
            user.changePassword(request.getPassword());
            user.encodePassword(passwordEncoder);
        }

        if (StringUtils.hasText(request.getProfile())) {
            user.changeProfile(request.getProfile());
        }
    }
}
