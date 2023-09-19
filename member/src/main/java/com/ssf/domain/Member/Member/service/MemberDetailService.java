package com.ssf.domain.Member.Member.service;

import com.ssf.domain.Member.Member.entity.dto.MemberDetailDTO;
import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.repository.MemberRepository;
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
