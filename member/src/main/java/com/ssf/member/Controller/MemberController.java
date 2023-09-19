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

    @GetMapping("/user/{email}")
    public MemberDetailDTO findByEmail(@PathVariable String email) {
        System.out.println("여기는 들어오나");
        MemberDetailDTO memberDetailDTO = memberDetailService.findByEmail(email);
        return memberDetailDTO;
    }
    @PutMapping("/user/{email}")
    public Member updateMember(@PathVariable String email, MemberUpdateDTO memberUpdateDTO) {
        System.out.println("PUT 요청이 들어오나?");
        Member member = memberUpdateService.update(email,memberUpdateDTO);
        memberRepository.save(member);


        return member;
    }

    @DeleteMapping("/user/{email}")
    public String deleteByEmail(@PathVariable String email){

        memberDeleteService.deleteByEmail(email);
        return "삭제 완";
    }
}
