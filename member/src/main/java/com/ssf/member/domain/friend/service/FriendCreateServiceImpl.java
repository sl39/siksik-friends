package com.ssf.member.domain.friend.service;

import com.ssf.member.domain.friend.Friend;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendCreateServiceImpl implements FriendCreateService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Override
    public void addFriend(Long toUserId, Long fromUserId) {
        friendRepository.save(Friend.builder()
                .user(userRepository.findById(toUserId).orElseThrow())
                .fromUserId(fromUserId)
                .activated(true)
                .build());

        friendRepository.save(Friend.builder()
                .user(userRepository.findById(fromUserId).orElseThrow())
                .fromUserId(toUserId)
                .build());
    }
}
