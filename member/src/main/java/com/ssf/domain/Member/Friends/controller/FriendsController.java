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

    @GetMapping("/friend/{userId}")
    public List<MemberFriendDTO> getFriend(@PathVariable Long userId){
        memberRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당이메일이 없습니다"));
        List<MemberFriendDTO> friends = friendsService.getFriends(userId);
        return friends;
    }

    @PostMapping("friend/{fromUserId}/{toUserId}")
    public String registerFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId){
        memberRepository.findById(fromUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
        memberRepository.findById(toUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));

        Friends friends = friendsService.save(fromUserId, toUserId);
        friendsRepository.save(friends);
        return "친구성공!";
    }

    @DeleteMapping("friend/{fromUserId}/{toUserId}")
    public String deleteFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId){
        Optional<Friends> friends = friendsService.delete(fromUserId, toUserId);
        Long id = friends.get().getId();
        friendsRepository.deleteById(id);
        return "친구 삭제 ㅠㅠ";
    }
}
