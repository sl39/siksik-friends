package com.ssf.member.domain.friend.service;

import com.ssf.member.domain.user.dto.UserDto;

import java.util.List;

public interface FriendFindService {

    public List<UserDto.Response> findFriend(String accessHeader);
    public List<UserDto.Response> findFriendResponse(String accessHeader);
    public List<UserDto.Response> findFriendRequest(String accessHeader);
}
