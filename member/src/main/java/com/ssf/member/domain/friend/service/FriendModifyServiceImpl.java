package com.ssf.member.domain.friend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.friend.Friend;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendModifyServiceImpl implements FriendModifyService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    private static final String BEARER = "Bearer ";
    private static final String ID_CLAIM = "id";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public void acceptFriend(String accessHeader, Long toUserId) {
        Friend friend = friendRepository.findByToUserIdAndUser_Id(userRepository
                .findById(Long
                        .parseLong(JWT
                                .require(Algorithm.HMAC512(secretKey))
                                .build()
                                .verify(accessHeader
                                        .replace(BEARER, ""))
                                .getClaim(ID_CLAIM)
                                .toString()))
                .orElseThrow()
                .getId(), toUserId)
                .orElseThrow();

        friend.changeActivated();
    }
}
