package com.ssf.member.domain.friend.repository;

import com.ssf.member.domain.friend.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    List<Friend> findAllByToUserIdAndActivated(Long toUserId, boolean activated);
    List<Friend> findAllByUser_IdAndActivated(Long fromUserId, boolean activated);
    boolean existsByToUserIdAndUser_IdAndActivated(Long toUserId, Long fromUserId, boolean activated);
    Optional<Friend> findByToUserIdAndUser_Id(Long toUserId, Long fromUserId);
    void deleteByUser_IdAndToUserId(Long fromUserId, Long toUserId);
    void deleteByToUserId(Long userId);
    void deleteByUser_Id(Long userId);
    boolean existsByUser_IdAndToUserIdAndActivated(Long fromUserId, Long toUserId, boolean activated);
}
