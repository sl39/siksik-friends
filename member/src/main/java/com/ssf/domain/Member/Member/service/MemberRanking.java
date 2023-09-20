package com.ssf.domain.Member.Member.service;

import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberFriendDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberRanking {

    private final MemberRepository memberRepository;
    public List getRankingList(){
        List<Member> members = memberRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
        List<MemberFriendDTO> memberFriendDTOS = new ArrayList<>();
        for(Member member: members){
            MemberFriendDTO memberFriendDTO = new MemberFriendDTO(member);
            memberFriendDTOS.add(memberFriendDTO);
        }
        return memberFriendDTOS;
    }

    public Map getRanking(){
        List<MemberFriendDTO> memberFriendDTOS = getRankingList();
        Long i = 0L;
        Map<Long, MemberFriendDTO> map = new HashMap<Long, MemberFriendDTO>();
        for(MemberFriendDTO memberFriendDTO: memberFriendDTOS){
            map.put(i + 1, memberFriendDTO);
            i += 1;
        }
        return map;

    }
}
