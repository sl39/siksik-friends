package com.example.demo.domain.service;

import com.example.demo.domain.Member;
import com.example.demo.domain.MemberSaveRequestDTO;
import com.example.demo.domain.repository.MemberRepsitory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service            // 내가 서비스다
@RequiredArgsConstructor    // 밑에 MemberRepository의 생성자를 쓰지 않기 위해서
public class MemberServiceImpl implements MemberService  {
    private final MemberRepsitory memberRepsitory;

    @Override
    public Long join(MemberSaveRequestDTO memberSaveRequestDTO){
        Member member = Member.builder()
                .email(memberSaveRequestDTO.getEmail())
                .username(memberSaveRequestDTO.getUsername())
                .password(memberSaveRequestDTO.getPassword())
                .build();
        return memberRepsitory.save(member).getId();
    }

}
