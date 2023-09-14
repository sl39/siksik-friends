package com.example.demo.domain.controller;

import com.example.demo.domain.MemberSaveRequestDTO;
import com.example.demo.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller			// 해당 클래스가 컨트롤러임을 알리고 bean으로 등록하기 위함
@RequiredArgsConstructor	// 나중에 의존관계 관련하여 필요한 어노테이션
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/")
    public String Home() {
        return "index";
    }

    @GetMapping("/members/new")
    public String createMemberForm(){
        return "singup";
    }

    @PostMapping("/members/new")
    public String createMemberForm(MemberSaveRequestDTO memberSaveRequestDTO){
        Long memberId = memberService.join(memberSaveRequestDTO);
        return "index";
    }
}
