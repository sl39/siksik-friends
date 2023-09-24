package com.ssf.member.domain.friend.repository;

import com.ssf.member.domain.friend.Friend;
import com.ssf.member.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    List<Friend> findAllByUser_IdAndActivated(Long toUserId, boolean activated);
}
