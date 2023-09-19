package com.ssf.domain.Member.Friends.repository;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FriendsRepository extends JpaRepository<Friends,Long> {

    Optional<Friends> findByFromUserAndToUserId(final Long fromUserId,final Long userId);

}
