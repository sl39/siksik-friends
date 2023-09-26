package com.ssf.member.domain.friend.service;

public interface FriendCreateService {

    public void addFriend(String accessHeader, Long toUserId);
}
