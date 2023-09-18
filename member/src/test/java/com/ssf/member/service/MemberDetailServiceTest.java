package com.ssf.member.service;

import com.ssf.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.*;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class MemberDetailServiceTest {
    private final String email = "test@test.com";
    private final String nickname = "se";
    private final Long score = 1000L;
    private final String profile = "image";

    @InjectMocks
    private MemberDetailService target;
    @Mock
    private MemberRepository memberRepository;

    @Test
    public void 멤버십상세조회실패_존재하지않음() {
        // given
        doReturn(Optional.empty()).when(memberRepository).findByEmail(email);

        // when
        final MemberException result = assertThrows(MemberException.class, () -> target.getMember(memberId, userId));

        // then
        assertThat(result.getErrorResult()).isEqualTo(MemberErrorResult.MEMBER_NOT_FOUND);
    }

    @Test
    public void 멤버십상세조회실패_본인이아님() {
        // given
        doReturn(Optional.empty()).when(memberRepository).findByEmail(email);

        // when
        final MemberException result = assertThrows(MemberException.class, () -> target.getMember(email, "notowner"));

        // then
        assertThat(result.getErrorResult()).isEqualTo(MemberErrorResult.MEMBER_NOT_FOUND);
    }

    @Test
    public void 멤버십상세조회성공() {
        // given
        doReturn(Optional.of(member())).when(memberRepository).findByEmail(email);

        // when
        final MemberDetailResponse result = target.getMember(memberId, userId);

        // then
        assertThat(result.getMemberType()).isEqualTo(MemberType.NAVER);
        assertThat(result.getPoint()).isEqualTo(point);
    }



}
