package com.spring.jpa.domain.User.controller;


import com.spring.jpa.domain.User.UserCreateForm;
import com.spring.jpa.domain.User.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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

//    @Transactional
//    @PostMapping("/singup")
//    public String singup(UserCreateForm userCreateForm){
//
//    }

}
