package com.ssf.domain.Member.Member.Controller;

import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberDetailDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import com.ssf.domain.Member.Member.service.MemberDeleteService;
import com.ssf.domain.Member.Member.service.MemberDetailService;
import com.ssf.domain.Member.Member.service.MemberUpdateService;
import com.ssf.domain.Member.Member.entity.dto.MemberUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberDetailService memberDetailService;
    private final MemberUpdateService memberUpdateService;
    private final MemberRepository memberRepository;
    private final MemberDeleteService memberDeleteService;

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
}
