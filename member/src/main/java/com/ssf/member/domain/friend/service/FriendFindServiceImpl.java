package com.ssf.member.domain.friend.service;

import com.ssf.member.domain.friend.Friend;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendFindServiceImpl implements FriendFindService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Override
    public List<UserDto.Response> findFriendReqeust(Long toUserId) {
        List<Friend> friends = friendRepository
                .findAllByUser_IdAndActivated(toUserId, false);

        List<UserDto.Response> requestList = new ArrayList<>();

        for (Friend friend : friends) {
            User user = userRepository.findById(friend.getFromUserId()).orElseThrow();

            requestList.add(UserDto.Response
                    .builder()
                    .nickname(user.getNickname())
                    .profile(user.getProfile())
                    .build());
        }

        return requestList;
    }
}
