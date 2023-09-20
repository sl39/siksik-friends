package com.ssf.auth.domain.user.serviceTest;

import com.ssf.auth.domain.user.dto.UserResponse;
import com.ssf.auth.domain.user.enums.UserErrorResult;
import com.ssf.auth.domain.user.SocialType;
import com.ssf.auth.domain.user.User;
import com.ssf.auth.domain.user.exception.UserException;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.domain.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @InjectMocks
    private UserService target;

    @Mock
    private UserRepository memberRepository;

    private static final String EMAIL = "test@test.com";
    private static final SocialType SOCIAL_TYPE = SocialType.NONE;
    private static final String PASSWORD = "password";
    private static final String NICKNAME = "nickname";

    @Test
    public void 멤버등록실패_이미존재함() {

        // given
        doReturn(User.builder().build()).when(memberRepository).findByEmailAndSocialType(EMAIL, SOCIAL_TYPE);

        // when
        final UserException result = assertThrows(UserException.class, () -> target.createMember(EMAIL, SOCIAL_TYPE));

        // then
        assertThat(result.getErrorResult()).isEqualTo(UserErrorResult.DUPLICATED_MEMBER_REGISTER);
    }

    @Test
    public void 멤버등록성공() {

        // given
        doReturn(null).when(memberRepository).findByEmailAndSocialType(EMAIL, SOCIAL_TYPE);
        doReturn(member()).when(memberRepository).save(any(User.class));

        // when
        final UserResponse result = target.createMember(EMAIL, SOCIAL_TYPE);

        // then
        assertThat(result.getEmail()).isEqualTo(EMAIL);
        assertThat(result.getSocialType()).isEqualTo(SOCIAL_TYPE);

        // verify
        verify(memberRepository, times(1)).findByEmailAndSocialType(EMAIL, SOCIAL_TYPE);
        verify(memberRepository, times(1)).save(any(User.class));
    }

    private User member() {
        return User.builder()
                .id(-1L)
                .email(EMAIL)
                .password(PASSWORD)
                .nickname(NICKNAME)
                .build();
    }
}
