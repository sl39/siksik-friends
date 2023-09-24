package com.ssf.member.domain.friend.controller;

import com.ssf.member.domain.friend.service.FriendCreateService;
import com.ssf.member.domain.friend.service.FriendFindService;
import com.ssf.member.domain.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendCreateService friendCreateService;
    private final FriendFindService friendFindService;

    @PostMapping("/{fromUserId}/{toUserId}")
    public String addFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId) {
        friendCreateService.addFriend(fromUserId, toUserId);
        return "친구 신청 완료";
    }

    @GetMapping("/{toUserId}")
    public List<UserDto.Response> findFriendReqeust(@PathVariable Long toUserId) {
        return friendFindService.findFriendReqeust(toUserId);
    }
}
