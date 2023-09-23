package com.ssf.member.domain.friend.controller;

import com.ssf.member.domain.friend.service.FriendCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class FriendController {

    private final FriendCreateService friendCreateService;

    @PostMapping("/{toUserId}/{fromUserId}")
    public String addFriend(@PathVariable Long toUserId, @PathVariable Long fromUserId) {
        friendCreateService.addFriend(toUserId, fromUserId);
        return "친구 신청 완료";
    }
}
