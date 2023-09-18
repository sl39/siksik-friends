package com.ssf.auth.domain.member.repositoryTest;

import com.ssf.auth.domain.member.Role;
import com.ssf.auth.domain.member.SocialType;
import com.ssf.auth.domain.member.entity.Member;
import com.ssf.auth.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void MemberRepository가Null이아님() {
        assertThat(memberRepository).isNotNull();
    }

    @Test
    public void 멤버등록() {
        // given
        final Member member = Member.builder()
                .email("test@test.com")
                .password("password")
                .nickname("nickname")
                .build();

        // when
        final Member result = memberRepository.save(member);

        // then
        assertThat(result.getId()).isNotNull();
        assertThat(result.getEmail()).isEqualTo("test@test.com");
        assertThat(result.getPassword()).isEqualTo("password");
        assertThat(result.getNickname()).isEqualTo("nickname");
        assertThat(result.getProfile()).isEqualTo("/profile.png");
        assertThat(result.getSignUpAt()).isNotNull();
        assertThat(result.getUpdateAt()).isNotNull();
        assertThat(result.getRole()).isEqualTo(Role.GUEST);
        assertThat(result.getSocialType()).isEqualTo(SocialType.NONE);
    }

    @Test
    public void 멤버조회() {
        // given
        final Member member = Member.builder()
                .email("test@test.com")
                .password("password")
                .nickname("nickname")
                .build();

        // when
        memberRepository.save(member);
        final Member findResult = memberRepository.findByEmailAndSocialType("test@test.com", SocialType.NONE);

        // then
        assertThat(findResult.getId()).isNotNull();
        assertThat(findResult.getEmail()).isEqualTo("test@test.com");
        assertThat(findResult.getPassword()).isEqualTo("password");
        assertThat(findResult.getNickname()).isEqualTo("nickname");
        assertThat(findResult.getProfile()).isEqualTo("/profile.png");
        assertThat(findResult.getSignUpAt()).isNotNull();
        assertThat(findResult.getUpdateAt()).isNotNull();
        assertThat(findResult.getRole()).isEqualTo(Role.GUEST);
        assertThat(findResult.getSocialType()).isEqualTo(SocialType.NONE);
    }
}
