package com.spring.jpa.domain.member.controller;


import com.spring.jpa.domain.member.UserCreateForm;
import com.spring.jpa.domain.member.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/singup")
    public String singup(UserService userService){
        return "singup_form";
    }

    @PostMapping("/singup")
    public String singup(UserCreateForm userCreateForm, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return "singup_form";
        }
        if(!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())){
            bindingResult.rejectValue("password2","passwordInCorrect","2개의 패스워드가 일치하지 않습니다.");
            return "singup_form";
        }
        userService.create(userCreateForm.getUsername(),userCreateForm.getEmail(),userCreateForm.getPassword1());
        return "성공!";
    }
}
