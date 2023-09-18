package com.ssf.member.Repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.*;


public class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void MemberRepository가null이아님(){
        assertThat(membershipRepository).isNotNull();
    }

}
