package com.ssf.member.service;

import com.ssf.domain.Member.Member.entity.dto.MemberDetailDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import com.ssf.domain.Member.Member.service.MemberDetailService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;

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



//    @Test
//    public void 멤버조회성공(){
//
//        //given
//        doReturn(new Member()).when(memberRepository).findByEmail(email);
//
//        //when
//        final Member result = target.findByEmail(email);
//        System.out.println(result.getEmail());
//        System.out.println(email);
//
//        //then
//        assertThat(result.getEmail()).isEqualTo(email);
//    }


}
