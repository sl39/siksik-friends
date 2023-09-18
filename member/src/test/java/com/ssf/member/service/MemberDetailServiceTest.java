package com.ssf.member.service;

import ch.qos.logback.core.spi.ErrorCodes;
import com.ssf.member.entity.MemberDetailDTO;
import com.ssf.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class MemberDetailServiceTest {
    @InjectMocks
    private MemberDetailService target;

    @Mock
    private MemberRepository memberRepository;


    private final String email = "test@test.com";
    private final MemberDetailDTO memberDetailDTO = MemberDetailDTO.builder()
            .email("test@test.com")
            .nickname("se")
            .profile("image")
            .score(1000L)
            .build();

    @Test
    public void 회원조회테스트성공() throws Exception{
        //given
        doReturn(Optional.of(memberDetailDTO)).when(memberRepository).findByEmail(email);

        //when
        MemberDetailDTO result = target.findByEmail(email);

        //then
        assertThat(result).isEqualTo(memberDetailDTO);
    }

    @Test
    public void 회원조회테스트실패() throws Exception{
        //given
        doReturn(Optional.empty()).when(memberRepository).findByEmail(email);

        //when
        MemberDetailDTO result = target.findByEmail(email);

        //then
        assertThat(result).isEqualTo(ErrorCode.NO_MATCHING_MEMBER.getMessage());

    }


}
