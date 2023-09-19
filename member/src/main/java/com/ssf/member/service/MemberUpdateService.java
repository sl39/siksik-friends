package com.ssf.member.service;

import com.ssf.member.entity.Member;
import com.ssf.member.entity.MemberDetailDTO;
import com.ssf.member.entity.MemberUpdateDTO;
import com.ssf.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberUpdateService {
    private final MemberRepository memberRepository;

    public Member findByEmail(String email){
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("해당이메일이 없습니다"));
        System.out.println(member);
        return member;
    }

    public Member update(String email,MemberUpdateDTO memberUpdateDTO){
        Member member = findByEmail(email);
        Member updateMember = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .nickname(memberUpdateDTO.getNickname())
                .score(member.getScore())
                .profile(memberUpdateDTO.getProfile())
                .signUpAt(member.getSignUpAt())
                .role(member.getRole())
                .socialType(member.getSocialType())
                .updateAt(member.getUpdateAt())
                .build();

        return updateMember;

    }
}
