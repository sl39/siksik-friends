package com.ssf.member.domain.user.controller;

import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.service.UserAddService;
import com.ssf.member.domain.user.service.UserFindService;
import com.ssf.member.domain.user.service.UserModifyService;
import com.ssf.member.domain.user.service.UserRemoveService;
import com.ssf.member.domain.user.domain.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserAddService userAddService;
    private final UserFindService userFindService;
    private final UserModifyService userModifyService;
    private final UserRemoveService userRemoveService;

    private static final String ACCESS_HEADER = "Authorization";
    private static final String DEFAULT_PROFILE_URL = "/images/character/rabbit.png";

    @GetMapping("/email")
    public ResponseEntity<Message> checkEmail(@Validated UserRequest.Email emailDto) {

        return userFindService.checkEmailDuplication(emailDto).getEmailRedundancyStatus() ?
                ResponseEntity.status(HttpStatus.CONFLICT).body(Message.IMPOSSIBLE_EMAIL):
                ResponseEntity.ok(Message.IMPOSSIBLE_EMAIL);
    }

    @GetMapping("/nickname")
    public ResponseEntity<Message> checkNickname(@Validated UserRequest.Nickname nicknameDto) {

        return userFindService.checkNicknameDuplication(nicknameDto).getNicknameRedundancyStatus() ?
                ResponseEntity.status(HttpStatus.CONFLICT).body(Message.IMPOSSIBLE_NICKNAME) :
                ResponseEntity.ok(Message.POSSIBLE_NICKNAME);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signIn(@RequestBody final UserRequest.SignUp signUpDto) {

        if (!StringUtils.hasText(signUpDto.getProfile())) {
            signUpDto.changeProfile(DEFAULT_PROFILE_URL);
        }

        userAddService.addUser(signUpDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-info")
    public UserDto.Response findMyInfo(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return userFindService.findMyInfo(accessHeader);
    }

    @GetMapping("/{id}")
    public UserDto.Response findUserDetail(@PathVariable Long id) {
        return userFindService.findUser(id);
    }

    @GetMapping("/")
    public UserDto.Response findUserToNickname(String nickname) {
        return userFindService.findNickname(nickname);
    }

    @PutMapping("/")
    public void modifyUser(@RequestHeader(ACCESS_HEADER) String accessHeader, @RequestBody UserDto.Request request) throws Exception {
        userModifyService.modifyUser(accessHeader, request);
    }

    @GetMapping("/rank")
    public List<UserDto.Response> rankList() {
        return userFindService.findRankList();
    }

    @DeleteMapping("/")
    public String removeUser(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        userRemoveService.removeUser(accessHeader);
        return "회원 탈퇴 완료";
    }
}
