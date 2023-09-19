package com.ssf.member.service;

import com.ssf.member.entity.Member;
import com.ssf.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberDeleteService {
    private final MemberRepository memberRepository;

    @Transactional
    public void deleteById(Long id){
        System.out.println("여기는 delete");
        memberRepository.deleteById(id);

    }
}
