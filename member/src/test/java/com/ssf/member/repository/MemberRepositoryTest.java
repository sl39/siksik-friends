package com.ssf.member.repository;

import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberDetailDTO;
import com.ssf.domain.Member.Member.enums.Role;
import com.ssf.domain.Member.Member.enums.SocialType;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class MemberRepositoryTest {

    private final MemberRepository memberRepository;

    public MemberRepositoryTest(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Test
    public void MemberRepository가null이아님(){
        assertThat(memberRepository).isNotNull();
    }

    @Test
    public void 멤버십등록(){
        // given
        final Member member = Member.builder()
                .email("test@test.com")
                .password("123")
                .nickname("se")
                .score(1000L)
                .profile("image").build();

        //when
        final Member result = memberRepository.save(member);

        //then
        assertThat(result.getId()).isNotNull();
        assertThat(result.getEmail()).isEqualTo("test@test.com");
        assertThat(result.getPassword()).isEqualTo("123");
        assertThat(result.getNickname()).isEqualTo("se");
        assertThat(result.getScore()).isEqualTo(1000L);
        assertThat(result.getProfile()).isEqualTo("image");
        assertThat(result.getRole()).isEqualTo(Role.GUEST);
        assertThat(result.getSocialType()).isEqualTo(SocialType.NONE);
        assertThat(result.getSignUpAt()).isNotNull();
        assertThat(result.getUpdateAt()).isNotNull();

    }

    @Test
    public void 멤버정보가져오기Test(){
        // given
        final MemberDetailDTO memberDetailDTO = MemberDetailDTO.builder()
                .email("test@test.com")
                .nickname("se")
                .score(1000L)
                .profile("image").build();
        // when
        final Optional<Member> memberDetailDTO1 = memberRepository.findById(memberDetailDTO.getId());


        // then
        assertThat(memberDetailDTO1).isNotNull();
        assertThat(memberDetailDTO1.get().getId()).isNotNull();
        assertThat(memberDetailDTO1.get().getEmail()).isEqualTo("test@test.com");
        assertThat(memberDetailDTO1.get().getNickname()).isEqualTo("se");
        assertThat(memberDetailDTO1.get().getScore()).isEqualTo(1000L);
        assertThat(memberDetailDTO1.get().getProfile()).isEqualTo("image");

    }
}
