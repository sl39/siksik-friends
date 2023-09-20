package com.ssf.domain.Member.Member.service;

import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberFriendDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberRanking {

    private final MemberRepository memberRepository;
    public List getRanking(){
        List<Member> members = memberRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
        List<MemberFriendDTO> memberFriendDTOS = new ArrayList<>();
        for(Member member: members){
            MemberFriendDTO memberFriendDTO = new MemberFriendDTO(member);
            memberFriendDTOS.add(memberFriendDTO);
        }
        return memberFriendDTOS;
    }
}
