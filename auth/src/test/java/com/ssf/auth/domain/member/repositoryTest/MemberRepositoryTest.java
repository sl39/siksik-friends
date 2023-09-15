package com.ssf.auth.domain.member.repositoryTest;

import com.ssf.auth.domain.member.entity.MemberEntity;
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
        final MemberEntity memberEntity = MemberEntity.builder()
                .email("test@test.com")
                .password("password")
                .nickname("nickname")
                .profile("/profile.png")
                .baild();

        // when
        final MemberEntity result = memberRepository.save(memberEntity);

        // then
        assertThat(result.getId()).isNotNull();
        assertThat(result.getEmail()).isEqualTo("test@test.com");
        assertThat(result.getPassword()).isEqualTo("password");
        assertThat(result.getNickname()).isEqualTo("nickname");
        assertThat(result.getProfile()).isEqualTo("/profile.png");
    }

}
