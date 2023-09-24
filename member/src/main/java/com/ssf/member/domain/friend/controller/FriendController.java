package com.ssf.member.domain.friend.controller;

import com.ssf.member.domain.friend.service.FriendCreateService;
import com.ssf.member.domain.friend.service.FriendFindService;
import com.ssf.member.domain.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendCreateService friendCreateService;
    private final FriendFindService friendFindService;

    @PostMapping("/{toUserId}")
    public String addFriend(@PathVariable Long toUserId, HttpServletRequest request) {
        friendCreateService.addFriend(request, toUserId);
        return "친구 신청 완료";
    }

    @GetMapping("/{toUserId}")
    public List<UserDto.Response> findFriendReqeust(@PathVariable Long toUserId) {
        return friendFindService.findFriendReqeust(toUserId);
    }
}
