package com.ssf.domain.Member.Friends.repository;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendsRepository extends JpaRepository<Friends,Long> {


    Optional<Friends> findByFromUserIdAndToUserId(final Long fromUserId,final Long userId);

    Optional<Friends> findByFromUserIdAndToUserIdAndActivated(Long fromUserId, Long toUserId, boolean activated);

    List<Friends> findByActivatedAndFromUserIdOrActivatedAndToUserId(boolean activated, Long fromUserId, boolean activated2, Long toUserId);

    List<Friends> findByFromUserIdAndActivated(Long fromUserId, boolean activated);

    List<Friends> findByToUserIdAndActivated(Long toUserId, boolean activated);

    @Override
    void deleteById(Long id);
}
