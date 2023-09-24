package com.ssf.member.domain.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
@RequiredArgsConstructor
public class UserFindServiceImpl implements UserFindService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.header}")
    private String accessHeader;

    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    private final RedisTemplate redisTemplate;
    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto.Response findMyInfo(HttpServletRequest request) {
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

        return UserDto.Response.builder()
                .user_id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .level(user.getLevel())
                .exp(user.getExp())
                .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame() * 100))
                .build();
    }

    @Override
    public UserDto.Response findUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(null);

        return UserDto.Response.builder()
                .user_id(user.getId())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .level(user.getLevel())
                .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame() * 100))
                .build();
    }

    @Override
    public List<UserDto.Response> findRank() {
        String key = "rank";
        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringStringZSetOperations.reverseRangeWithScores(key, 0, 9);
        List<UserDto.Response> rankList = new ArrayList<>();
        AtomicReference<Long> i = new AtomicReference<>(0L);

        typedTuples.forEach(typedTuple -> {
            User user = userRepository.findById(Long.valueOf(typedTuple.getValue())).orElseThrow();
            System.out.println(i.getAndSet(i.get() + 1));
            rankList.add(UserDto.Response
                    .builder()
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .profile(user.getProfile())
                    .level(user.getLevel())
                    .rank(i.getAndSet(i.get() + 1))
                    .score(typedTuple.getScore().intValue())
                    .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame() * 100))
                    .build());
        });

        return rankList;
    }
}
