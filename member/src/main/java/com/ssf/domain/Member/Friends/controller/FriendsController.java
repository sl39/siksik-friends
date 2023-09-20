package com.ssf.domain.Member.Friends.controller;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Friends.entity.FriendsDTO;
import com.ssf.domain.Member.Friends.repository.FriendsRepository;
import com.ssf.domain.Member.Friends.service.FriendsService;
import com.ssf.domain.Member.Member.entity.dto.MemberFriendDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class FriendsController {
    private final FriendsService friendsService;
    private final FriendsRepository friendsRepository;
    private final MemberRepository memberRepository;


    // 친구 목록
    @GetMapping("/user/friend/{userId}")
    public List<MemberFriendDTO> getFriend(@PathVariable Long userId){
        memberRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당이메일이 없습니다"));
        List<MemberFriendDTO> friends = friendsService.getFriends(userId);
        return friends;
    }

    @PostMapping("/user/friend/{fromUserId}/{toUserId}")
    public String requestFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId){
        Friends friends = friendsService.requestFriendService(fromUserId, toUserId);
        friendsRepository.save(friends);
        return "친구 요청";
    }

    @PutMapping()
    
    // 친구 삭제
    @DeleteMapping("/user/friend/{fromUserId}/{toUserId}")
    public String deleteFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId){
        Optional<Friends> friends = friendsService.delete(fromUserId, toUserId);
        Long id = friends.get().getId();
        friendsRepository.deleteById(id);
        return "친구 삭제 ㅠㅠ";
    }
}
