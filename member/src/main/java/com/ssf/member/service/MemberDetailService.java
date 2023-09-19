package com.ssf.member.service;

import com.ssf.member.entity.Member;
import com.ssf.member.entity.MemberDetailDTO;
import com.ssf.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberDetailService {

    private final MemberRepository memberRepository;


    public MemberDetailDTO findById(Long id){
        Member member = memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당이메일이 없습니다"));
        System.out.println(member);
        return new MemberDetailDTO(member);
    }
}
