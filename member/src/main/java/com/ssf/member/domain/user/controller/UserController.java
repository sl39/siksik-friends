package com.ssf.member.domain.user.controller;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.service.UserFindService;
import com.ssf.member.domain.user.service.UserModifyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserFindService userFindService;
    private final UserModifyService userModifyService;

    @GetMapping("")
    public UserDto.Response findMyInfo(HttpServletRequest request) {
        return userFindService.findMyInfo(request);
    }

    @GetMapping("/{id}")
    public UserDto.Response findUserDetail(@PathVariable Long id) {
        return userFindService.findUser(id);
    }

    @PutMapping("/{id}")
    public void modifyUser(@PathVariable Long id, @RequestBody UserDto.Request request) {
        userModifyService.modifyUser(id, request);
    }

    @GetMapping("/rank")
    public List<UserDto.Detail> findRank() {
        return userFindService.findUsers();
    }

//    @GetMapping("/test")
//    public String test() {
//        userFindService.test();
//        return "더미 생성 완료";
//    }
}
