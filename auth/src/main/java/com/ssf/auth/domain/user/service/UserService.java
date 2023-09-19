package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserResponse;
import com.ssf.auth.domain.user.entity.User;
import com.ssf.auth.domain.user.enums.UserErrorResult;
import com.ssf.auth.domain.user.enums.SocialType;
import com.ssf.auth.domain.user.exception.UserException;
import com.ssf.auth.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository memberRepository;

    private static final String EMAIL = "test@test.com";
    private static final String PASSWORD = "password";
    private static final String NICKNAME = "nickname";

    public UserResponse createMember(final String email, final SocialType socialType) {
        final User result = memberRepository.findByEmailAndSocialType(email, socialType);

        if (result != null) {
            throw new UserException(UserErrorResult.DUPLICATED_MEMBER_REGISTER);
        }

        final User member = User.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .nickname(NICKNAME)
                .build();

        final User savedMember =  memberRepository.save(member);

        return UserResponse.builder()
                .email(savedMember.getEmail())
                .socialType(savedMember.getSocialType())
                .build();
    }
}
