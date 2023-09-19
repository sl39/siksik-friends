package com.ssf.member.Controller;

import com.ssf.member.entity.Member;
import com.ssf.member.entity.MemberDetailDTO;
import com.ssf.member.entity.MemberUpdateDTO;
import com.ssf.member.repository.MemberRepository;
import com.ssf.member.service.MemberDetailService;
import com.ssf.member.service.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor

public class MemberController {

    private final MemberDetailService memberDetailService;
    private final MemberUpdateService memberUpdateService;
    private final MemberRepository memberRepository;

    @GetMapping("/user/{email}")
    public MemberDetailDTO findByEmail(@PathVariable String email) {
        System.out.println("여기는 들어오나");
        MemberDetailDTO memberDetailDTO = memberDetailService.findByEmail(email);
        return memberDetailDTO;
    }
    @PutMapping("/user/{email}")
    public Member findByEmail(@PathVariable String email, MemberUpdateDTO memberUpdateDTO) {
        System.out.println("PUT 요청이 들어오나?");
        Member member = memberUpdateService.update(email,memberUpdateDTO);
        memberRepository.save(member);


        return member;
    }
}
