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

    public void update(Long id,MemberUpdateDTO memberUpdateDTO){
        Member member = memberRepository.findById(id).get();
        member.update(memberUpdateDTO);

        System.out.println(member.getId());
        System.out.println(member.getEmail());
        System.out.println(member.getPassword());
        System.out.println(member.getNickname());
        System.out.println(member.getProfile());
        System.out.println(member.getRole());
        System.out.println(member.getScore());

        memberRepository.save(member);
    }
}
