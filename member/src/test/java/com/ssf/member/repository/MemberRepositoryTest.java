package com.ssf.member.repository;

import com.ssf.member.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;


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
                .score(1000)
                .activated(false)
                .profile("image")
                .role("MEMBER")
                .social_type("kakao")
                .sign_up_at("2023-09-18")
                .update_at("2023-09-18");

        //when
        final Member result = memberRepository.save(member);

        //then
        assertThat(result.getId()).isNotNull();
        assertThat(result.getEmail()).isEqualTo("test@test.com");
        assertThat(result.getPassword()).isEqualTo("123");
        assertThat(result.getNickname()).isEqualTo("se");
        assertThat(result.getScore()).isEqualTo(1000);
        assertThat(result.getActivated()).isEqualTo(false);
        assertThat(result.getProfile()).isEqualTo("image");
        assertThat(result.getRole()).isEqualTo("MEMBER");
        assertThat(result.getSocial_type()).isEqualTo("kakao");
        assertThat(result.getSign_up_at()).isEqualTo("2023-09-18");
        assertThat(result.getUpdate_at()).isEqualTo("2023-09-18");

    }

}
