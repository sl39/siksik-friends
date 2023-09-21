package com.ssf.domain.Member.Member.service;

import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberUpdateDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberUpdateService {
    private final MemberRepository memberRepository;

    public Member findById(Long id){
        Member member = memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당이메일이 없습니다"));
        System.out.println(member);
        return member;
    }

    public Member update(Long id,MemberUpdateDTO memberUpdateDTO){
        Member member = memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당이메일이 없습니다"));
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
