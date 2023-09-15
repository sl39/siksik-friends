package com.ssf.auth.domain.member.repositoryTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.*;

public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void MemberRepository가Null이아님() {
        assertThat(memberRepository).isNotNull();
    }

}
