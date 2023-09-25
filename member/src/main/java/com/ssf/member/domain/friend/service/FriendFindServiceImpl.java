package com.ssf.member.domain.friend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.friend.Friend;
import com.ssf.member.domain.friend.dto.FriendResponseDto;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendFindServiceImpl implements FriendFindService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public FriendResponseDto findFriend(String accessHeader) {
        List<Friend> friends = friendRepository
                        .findAllByToUserIdAndActivated(userRepository.findById(Long
                                .parseLong(JWT
                                        .require(Algorithm.HMAC512(secretKey))
                                        .build()
                                        .verify(accessHeader
                                                .replace(BEARER, ""))
                                        .getClaim(ID_CLAIM)
                                        .toString()))
                        .orElseThrow().getId(), true);

        List<UserDto.Response> requestList = new ArrayList<>();

        for (Friend friend : friends) {
            User user = userRepository.findById(friend.getUser().getId()).orElseThrow();

            requestList.add(UserDto.Response
                    .builder()
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .level(user.getLevel())
                    .profile(user.getProfile())
                    .activated(user.getActivated())
                    .build());
        }

        Collections.sort(requestList);

        return FriendResponseDto.builder()
                .size((long) requestList.size())
                .friendList(requestList)
                .build();
    }

    @Override
    public FriendResponseDto findFriendResponse(String accessHeader) {
        List<Friend> friends = friendRepository
                .findAllByUser_IdAndActivated(userRepository.findById(Long
                                .parseLong(JWT
                                        .require(Algorithm.HMAC512(secretKey))
                                        .build()
                                        .verify(accessHeader
                                                .replace(BEARER, ""))
                                        .getClaim(ID_CLAIM)
                                        .toString()))
                        .orElseThrow().getId(), false);

        System.out.println(friends.size());

        List<UserDto.Response> requestList = new ArrayList<>();

        for (Friend friend : friends) {
            User user = userRepository.findById(friend.getToUserId()).orElseThrow();

            requestList.add(UserDto.Response
                    .builder()
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .level(user.getLevel())
                    .profile(user.getProfile())
                    .activated(user.getActivated())
                    .build());
        }

        Collections.sort(requestList);

        return FriendResponseDto.builder()
                .size((long) requestList.size())
                .friendList(requestList)
                .build();
    }

    @Override
    public FriendResponseDto findFriendRequest(String accessHeader) {
        List<Friend> friends = friendRepository
                .findAllByToUserIdAndActivated(userRepository.findById(Long
                                .parseLong(JWT
                                        .require(Algorithm.HMAC512(secretKey))
                                        .build()
                                        .verify(accessHeader
                                                .replace(BEARER, ""))
                                        .getClaim(ID_CLAIM)
                                        .toString()))
                        .orElseThrow().getId(), false);

        List<UserDto.Response> requestList = new ArrayList<>();

        for (Friend friend : friends) {
            User user = userRepository.findById(friend.getUser().getId()).orElseThrow();

            requestList.add(UserDto.Response
                    .builder()
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .level(user.getLevel())
                    .profile(user.getProfile())
                    .activated(user.getActivated())
                    .build());
        }

        Collections.sort(requestList);

        return FriendResponseDto.builder()
                .size((long) requestList.size())
                .friendList(requestList)
                .build();
    }

    @Override
    public int isFriends(String accessHeader, Long targetUserId) {
        Long userId = userRepository.findById(Long
                        .parseLong(JWT
                                .require(Algorithm.HMAC512(secretKey))
                                .build()
                                .verify(accessHeader
                                        .replace(BEARER, ""))
                                .getClaim(ID_CLAIM)
                                .toString()))
                .orElseThrow().getId();

        if (friendRepository.existsByUser_IdAndToUserIdAndActivated(userId, targetUserId, true)
            && friendRepository.existsByUser_IdAndToUserIdAndActivated(targetUserId, userId, false)) {
            return 1;
        }

        if (friendRepository.existsByUser_IdAndToUserIdAndActivated(userId, targetUserId, false)
                && friendRepository.existsByUser_IdAndToUserIdAndActivated(targetUserId, userId, true)) {
            return 2;
        }

        if (friendRepository.existsByUser_IdAndToUserIdAndActivated(userId, targetUserId, true)
                && friendRepository.existsByUser_IdAndToUserIdAndActivated(targetUserId, userId, true)) {
            return 4;
        }

        return 3;
    }
}
