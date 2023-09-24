package com.ssf.member.domain.friend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendRemoveServiceImpl implements FriendRemoveService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public void removeFriend(String accessHeader, Long fromUserId) {
        Long toUserId = userRepository.findById(Long
                        .parseLong(JWT
                                .require(Algorithm.HMAC512(secretKey))
                                .build()
                                .verify(accessHeader
                                        .replace(BEARER, ""))
                                .getClaim(ID_CLAIM)
                                .toString()))
                .orElseThrow()
                .getId();

        friendRepository.deleteByUser_IdAndToUserId(toUserId, fromUserId);
        friendRepository.deleteByUser_IdAndToUserId(fromUserId, toUserId);
    }
}
