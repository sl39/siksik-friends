package com.ssf.member.domain.friend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.friend.Friend;
import com.ssf.member.domain.friend.repository.FriendRepository;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendCreateServiceImpl implements FriendCreateService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.header}")
    private String accessHeader;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Override
    public void addFriend(HttpServletRequest request, Long toUserId) {
        User user = userRepository.findById(Long
                        .parseLong(JWT
                                .require(Algorithm.HMAC512(secretKey))
                                .build()
                                .verify(request
                                        .getHeader(accessHeader)
                                        .replace(BEARER, ""))
                                .getClaim(ID_CLAIM)
                                .toString()))
                .orElseThrow();

        friendRepository.save(Friend.builder()
                .user(userRepository.findById(user.getId()).orElseThrow())
                .toUserId(toUserId)
                .activated(true)
                .build());

        friendRepository.save(Friend.builder()
                .user(userRepository.findById(toUserId).orElseThrow())
                .toUserId(user.getId())
                .build());
    }
}
