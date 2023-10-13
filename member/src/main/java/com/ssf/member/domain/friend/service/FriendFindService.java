package com.ssf.member.domain.friend.service;

import com.ssf.member.domain.friend.dto.FriendResponseDto;
import com.ssf.member.domain.user.dto.UserDto;

import java.util.List;

public interface FriendFindService {

    FriendResponseDto findFriend(String accessHeader);
    FriendResponseDto findFriendResponse(String accessHeader);
    FriendResponseDto findFriendRequest(String accessHeader);
    int isFriends(String accessHeader, Long targetUserId);
    int getLevel(Long id);
}
