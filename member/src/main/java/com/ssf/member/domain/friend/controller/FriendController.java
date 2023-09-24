package com.ssf.member.domain.friend.controller;

import com.ssf.member.domain.friend.service.FriendCreateService;
import com.ssf.member.domain.friend.service.FriendFindService;
import com.ssf.member.domain.friend.service.FriendModifyService;
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
    private final FriendModifyService friendModifyService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/{toUserId}")
    public List<UserDto.Response> findFriendReqeust(@PathVariable Long toUserId) {
        return friendFindService.findFriendReqeust(toUserId);
    }

    @PostMapping("/{toUserId}")
    public String addFriend(@RequestHeader(ACCESS_HEADER) String accessHeader, @PathVariable Long toUserId) {
        friendCreateService.addFriend(accessHeader, toUserId);
        return "친구 신청 완료";
    }

    @PutMapping("/{fromUserId}")
    public String acceptFriend(@RequestHeader(ACCESS_HEADER) String accessHeader, @PathVariable Long fromUserId) {
        friendModifyService.acceptFriend(accessHeader, fromUserId);
        return "친구 수락 완료";
    }
}
