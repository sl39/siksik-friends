package com.ssf.member.repository;

import com.ssf.member.entity.Member;
import com.ssf.member.enums.Role;
import com.ssf.member.enums.SocialType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
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
                .profile("image").build();

        //when
        final Member result = memberRepository.save(member);

        //then
        assertThat(result.getId()).isNotNull();
        assertThat(result.getEmail()).isEqualTo("test@test.com");
        assertThat(result.getPassword()).isEqualTo("123");
        assertThat(result.getNickname()).isEqualTo("se");
        assertThat(result.getScore()).isEqualTo(1000);
        assertThat(result.getProfile()).isEqualTo("image");
        assertThat(result.getRole()).isEqualTo(Role.GUEST);
        assertThat(result.getSocialType()).isEqualTo(SocialType.NONE);
        assertThat(result.getSignUpAt()).isNotNull();
        assertThat(result.getUpdateAt()).isNotNull();

    }

    @Test
    public void 멤버정보가져오기Test(){
        // given
        final Member member = Member.builder()
                .email("test@test.com")
                .nickname("se")
                .score(1000)
                .profile("image").build();
        // when
        final Member member1 = memberRepository.findByEmail("test@test.com");

        // then
        assertThat(member1).isNotNull();
        assertThat(member1.getId()).isNotNull();
        assertThat(member1.getEmail()).isEqualTo("test@test.com");
        assertThat(member1.getNickname()).isEqualTo("se");
        assertThat(member1.getScore()).isEqualTo(1000);
        assertThat(member1.getProfile()).isEqualTo("image");


    }
}
