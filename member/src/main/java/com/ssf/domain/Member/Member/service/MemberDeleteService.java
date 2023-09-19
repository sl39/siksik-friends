package com.ssf.domain.Member.Member.service;

import com.ssf.domain.Member.Member.repository.MemberRepository;
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
