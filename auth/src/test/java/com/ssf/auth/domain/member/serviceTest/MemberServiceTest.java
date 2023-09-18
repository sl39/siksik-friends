package com.ssf.auth.domain.member.serviceTest;

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
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @InjectMocks
    private MemberService target;

    @Mock
    private MemberRepository memberRepository;

    @Test
    public void 멤버등록실패_이미존재함() {

        // given
        doReturn(Member.builder().build()).when(memberRepository).findByEmailAndSocialType("test@test.com", SocialType.NONE);

        // when
        final MemberException result = assertThrows(MemberException.class, () -> target.createMember("test@test.com", SocialType.NONE));

        // then
        assertThat(result.getErrorResult()).isEqualTo(MemberErrorResult.DUPLICATED_MEMBER_REGISTER);
    }
}
