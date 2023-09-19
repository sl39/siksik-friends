package com.ssf.auth.domain.user.repositoryTest;

import com.ssf.auth.domain.user.enums.Role;
import com.ssf.auth.domain.user.enums.SocialType;
import com.ssf.auth.domain.user.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MemberRepositoryTest {

    private static final String EMAIL = "test@test.com";
    private static final String PASSWORD = "password";
    private static final String NICKNAME = "nickname";
    private static final String PROFILE = "/profile.png";

    @Autowired
    private UserRepository memberRepository;

    @Test
    public void MemberRepository가Null이아님() {
        assertThat(memberRepository).isNotNull();
    }

    @Test
    public void 멤버등록() {
        // given
        final User member = User.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .nickname(NICKNAME)
                .build();

        // when
        final User result = memberRepository.save(member);

        // then
        assertThat(result.getId()).isNotNull();
        assertThat(result.getEmail()).isEqualTo(EMAIL);
        assertThat(result.getPassword()).isEqualTo(PASSWORD);
        assertThat(result.getNickname()).isEqualTo(NICKNAME);
        assertThat(result.getProfile()).isEqualTo(PROFILE);
        assertThat(result.getSignUpAt()).isNotNull();
        assertThat(result.getUpdateAt()).isNotNull();
        assertThat(result.getRole()).isEqualTo(Role.GUEST);
        assertThat(result.getSocialType()).isEqualTo(SocialType.NONE);
    }

    @Test
    public void 멤버조회() {
        // given
        final User member = User.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .nickname(NICKNAME)
                .build();

        // when
        memberRepository.save(member);
        final User findResult = memberRepository.findByEmailAndSocialType(EMAIL, SocialType.NONE);

        // then
        assertThat(findResult.getId()).isNotNull();
        assertThat(findResult.getEmail()).isEqualTo(EMAIL);
        assertThat(findResult.getPassword()).isEqualTo(PASSWORD);
        assertThat(findResult.getNickname()).isEqualTo(NICKNAME);
        assertThat(findResult.getProfile()).isEqualTo(PROFILE);
        assertThat(findResult.getSignUpAt()).isNotNull();
        assertThat(findResult.getUpdateAt()).isNotNull();
        assertThat(findResult.getRole()).isEqualTo(Role.GUEST);
        assertThat(findResult.getSocialType()).isEqualTo(SocialType.NONE);
    }
}
