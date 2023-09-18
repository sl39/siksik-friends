package com.ssf.auth.domain.member.serviceTest;

import com.ssf.auth.domain.member.SocialType;
import com.ssf.auth.domain.member.entity.Member;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @Test
    public void 멤버등록실패_이미존재함() {

        // given
        doReturn(Member.builder().build()).when(memberRepository).findByEmailAndSocialType("test@test.com", SocialType.NONE);

        // when
        final MemberException result = assertThat(MemberException.class, () -> target.addMember("test@test.com", SocialType.NONE));

        // then
        assertThat(result.getErrorResult()).isEqualTo(MemberErrorResult.DUPLICATED_MEMBER_REGISTER);
    }
}
