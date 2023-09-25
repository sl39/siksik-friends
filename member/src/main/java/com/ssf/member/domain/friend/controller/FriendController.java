package com.ssf.member.domain.friend.controller;

import com.ssf.member.domain.friend.dto.FriendResponseDto;
import com.ssf.member.domain.friend.service.FriendCreateService;
import com.ssf.member.domain.friend.service.FriendFindService;
import com.ssf.member.domain.friend.service.FriendModifyService;
import com.ssf.member.domain.friend.service.FriendRemoveService;
import com.ssf.member.domain.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/friend")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FriendController {

    private final FriendCreateService friendCreateService;
    private final FriendFindService friendFindService;
    private final FriendModifyService friendModifyService;
    private final FriendRemoveService friendRemoveService;

    private static final String ACCESS_HEADER = "Authorization";

    @GetMapping("/list")
    public FriendResponseDto findFriend(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return friendFindService.findFriend(accessHeader);
    }

    @GetMapping("/response")
    public FriendResponseDto findFriendResponse(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return friendFindService.findFriendResponse(accessHeader);
    }

    @GetMapping("/request")
    public FriendResponseDto findFriendRequest(@RequestHeader(ACCESS_HEADER) String accessHeader) {
        return friendFindService.findFriendRequest(accessHeader);
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

    @DeleteMapping("/{fromUserId}")
    public String deleteFriend(@RequestHeader(ACCESS_HEADER) String accessHeader, @PathVariable Long fromUserId) {
        friendRemoveService.removeFriend(accessHeader, fromUserId);
        return "친구 삭제/거절/요청 취소 완료";
    }

    @GetMapping("/{targetUserId}")
    public Map<String, Integer> statusFriend(@RequestHeader(ACCESS_HEADER) String accessHeader, @PathVariable Long targetUserId) {
        Map<String, Integer> map = new HashMap<>();
        map.put("status", friendFindService.isFriends(accessHeader, targetUserId));
        return map;
    }
}
