package com.ssf.member.domain.friend.service;

import jakarta.servlet.http.HttpServletRequest;

public interface FriendCreateService {

    public void addFriend(HttpServletRequest request, Long toUserId);
}
