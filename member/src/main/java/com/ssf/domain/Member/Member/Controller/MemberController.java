package com.ssf.domain.Member.Member.Controller;

import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberDetailDTO;
import com.ssf.domain.Member.Member.entity.dto.MemberFriendDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import com.ssf.domain.Member.Member.service.MemberDeleteService;
import com.ssf.domain.Member.Member.service.MemberDetailService;
import com.ssf.domain.Member.Member.service.MemberRanking;
import com.ssf.domain.Member.Member.service.MemberUpdateService;
import com.ssf.domain.Member.Member.entity.dto.MemberUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberDetailService memberDetailService;
    private final MemberUpdateService memberUpdateService;
    private final MemberRepository memberRepository;
    private final MemberDeleteService memberDeleteService;
    private final MemberRanking memberRanking;

    @GetMapping("/user/{userId}")
    public MemberDetailDTO findByEmail(@PathVariable Long userId) {
        System.out.println("여기는 들어오나");
        MemberDetailDTO memberDetailDTO = memberDetailService.findById(userId);
        return memberDetailDTO;
    }
    @PutMapping("/user/{userId}")
    public String updateMember(@PathVariable Long userId, MemberUpdateDTO memberUpdateDTO) {
        System.out.println("PUT 요청이 들어오나?");
        Member member = memberUpdateService.update(userId,memberUpdateDTO);
        memberRepository.save(member);


        return "update complete";
    }

    @DeleteMapping("/user/{userId}")
    public String deleteById(@PathVariable Long userId){

        memberDeleteService.deleteById(userId);
        return "삭제 완";
    }

    @GetMapping("/ranking")
    public List getRanking(){
        List<MemberFriendDTO> ranking = memberRanking.getRanking();
        return ranking;
    }

    @GetMapping("/ranking/{userId}")
    public Long getUserRanking(@PathVariable Long userId){
        List<MemberFriendDTO> ranking = memberRanking.getRanking();
        Long i = 0L;
        for(MemberFriendDTO memberFriendDTO: ranking){
            if(memberFriendDTO.getId() == userId){
                return i + 1;
            }
            i++;
        }
        return i;
    }
}
