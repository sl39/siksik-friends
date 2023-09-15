package com.example.demo.domain.controller;

import com.example.demo.domain.MemberDetailDTO;
import com.example.demo.domain.MemberResponseDTO;
import com.example.demo.domain.MemberSaveRequestDTO;
import com.example.demo.domain.service.MemberService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller			// 해당 클래스가 컨트롤러임을 알리고 bean으로 등록하기 위함
@RequiredArgsConstructor	// 나중에 의존관계 관련하여 필요한 어노테이션
@Slf4j
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
    public String createMemberForm(@Valid MemberSaveRequestDTO memberSaveRequestDTO,BindingResult bindingResult){
        System.out.println(memberSaveRequestDTO.getUsername());
        System.out.println(memberSaveRequestDTO.getEmail());

        if (!memberSaveRequestDTO.getPassword1().equals(memberSaveRequestDTO.getPassword2())){
            bindingResult.rejectValue("password2", "passwordInCorrect","2개의 패스워드가 일치하지 않습니다.");
            return "singup";
        }
        try {
            memberService.join(memberSaveRequestDTO);
        } catch (IllegalStateException e){
            System.out.println("error");
            return "singup";
        }
        return "index";
    }

    @GetMapping("/success")
    public String Success(){
        return "success";
    }

    @GetMapping("/members")
    public String members(Model model) {
        List<MemberResponseDTO> members = memberService.findMembers();
        model.addAttribute("members", members);
        System.out.println(members);
        return "members";
    }
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@Valid MemberDetailDTO memberDetailDTO, BindingResult bindingResult){
        System.out.println(memberDetailDTO.getEmail());
        System.out.println(memberDetailDTO.getPassword());
        if(bindingResult.hasErrors()){
            return "login";
        }
        return "index";
    }
}
