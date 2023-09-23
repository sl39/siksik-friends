package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserFindServiceImpl implements UserFindService {

    private final UserRepository userRepository;

    @Override
    public UserDto.Detail findUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(null);

        return UserDto.Detail.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .score(user.getScore())
                .profile(user.getProfile())
                .build();
    }
}
