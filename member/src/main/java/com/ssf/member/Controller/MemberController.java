package com.ssf.member.Controller;

import com.ssf.member.entity.Member;
import com.ssf.member.entity.MemberDetailDTO;
import com.ssf.member.entity.MemberUpdateDTO;
import com.ssf.member.repository.MemberRepository;
import com.ssf.member.service.MemberDeleteService;
import com.ssf.member.service.MemberDetailService;
import com.ssf.member.service.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


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
    public Member updateMember(@PathVariable Long userId, MemberUpdateDTO memberUpdateDTO) {
        System.out.println("PUT 요청이 들어오나?");
        Member member = memberUpdateService.update(userId,memberUpdateDTO);
        memberRepository.save(member);


        return member;
    }

    @DeleteMapping("/user/{userId}")
    public String deleteById(@PathVariable Long userId){

        memberDeleteService.deleteById(userId);
        return "삭제 완";
    }
}
