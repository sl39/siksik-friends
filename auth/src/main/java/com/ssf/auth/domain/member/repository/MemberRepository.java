package com.ssf.auth.domain.member.repository;

import com.ssf.auth.domain.member.enums.SocialType;
import com.ssf.auth.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmailAndSocialType(final String email, final SocialType socialType);
}
