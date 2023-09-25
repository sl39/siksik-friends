package com.ssf.member.domain.friend.service;

import com.ssf.member.domain.friend.dto.FriendResponseDto;
import com.ssf.member.domain.user.dto.UserDto;

import java.util.List;

public interface FriendFindService {

    public FriendResponseDto findFriend(String accessHeader);
    public FriendResponseDto findFriendResponse(String accessHeader);
    public FriendResponseDto findFriendRequest(String accessHeader);
    public int isFriends(String accessHeader, Long targetUserId);
}
