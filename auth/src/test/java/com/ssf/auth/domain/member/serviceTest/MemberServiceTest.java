package com.ssf.auth.domain.member.serviceTest;

import com.ssf.auth.domain.member.dto.MemberResponse;
import com.ssf.auth.domain.member.enums.MemberErrorResult;
import com.ssf.auth.domain.member.enums.SocialType;
import com.ssf.auth.domain.member.entity.Member;
import com.ssf.auth.domain.member.exception.MemberException;
import com.ssf.auth.domain.member.repository.MemberRepository;
import com.ssf.auth.domain.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @InjectMocks
    private MemberService target;

    @Mock
    private MemberRepository memberRepository;

    private static final String EMAIL = "test@test.com";
    private static final SocialType SOCIAL_TYPE = SocialType.NONE;
    private static final String PASSWORD = "password";
    private static final String NICKNAME = "nickname";

    @Test
    public void 멤버등록실패_이미존재함() {

        // given
        doReturn(Member.builder().build()).when(memberRepository).findByEmailAndSocialType(EMAIL, SOCIAL_TYPE);

        // when
        final MemberException result = assertThrows(MemberException.class, () -> target.createMember(EMAIL, SOCIAL_TYPE));

        // then
        assertThat(result.getErrorResult()).isEqualTo(MemberErrorResult.DUPLICATED_MEMBER_REGISTER);
    }

    @Test
    public void 멤버등록성공() {

        // given
        doReturn(null).when(memberRepository).findByEmailAndSocialType(EMAIL, SOCIAL_TYPE);
        doReturn(member()).when(memberRepository).save(any(Member.class));

        // when
        final MemberResponse result = target.createMember(EMAIL, SOCIAL_TYPE);

        // then
        assertThat(result.getEmail()).isEqualTo(EMAIL);
        assertThat(result.getSocialType()).isEqualTo(SOCIAL_TYPE);

        // verify
        verify(memberRepository, times(1)).findByEmailAndSocialType(EMAIL, SOCIAL_TYPE);
        verify(memberRepository, times(1)).save(any(Member.class));
    }

    private Member member() {
        return Member.builder()
                .id(-1L)
                .email(EMAIL)
                .password(PASSWORD)
                .nickname(NICKNAME)
                .build();
    }
}
