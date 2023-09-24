package com.ssf.member.domain.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .level(user.getLevel())
                .rank(user.getRank())
                .score(user.getScore())
                .exp(user.getExp())
                .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame() * 100))
                .build();
    }

    @Override
    public UserDto.Response findUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(null);

        return UserDto.Response.builder()
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .level(user.getLevel())
                .rank(user.getRank())
                .score(user.getScore())
                .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame() * 100))
                .build();
    }

    @Override
    public List<UserDto.Detail> findUsers() {
        List<User> users = userRepository.findTop10ByOrderByScoreDesc().orElseThrow(null);
        List<UserDto.Detail> result = new ArrayList<>();

        for (User user : users) {
            result.add(UserDto.Detail.builder()
                    .nickname(user.getNickname())
                    .profile(user.getProfile())
                    .level(user.getLevel())
                    .rank(user.getRank())
                    .score(user.getScore())
                    .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame() * 100))
                    .build());
        }

        return result;
    }

//    @Override
//    public void test() {
//        int leftLimit = 48; // numeral '0'
//        int rightLimit = 122; // letter 'z'
//        int targetStringLength = 10;
//        Random random = new Random();
//
//        for (int i = 0; i < 100; i++) {
//            User user = User.builder()
//                    .email(random.ints(leftLimit, rightLimit + 1)
//                            .filter(j -> (j <= 57 || j >= 65) && (j <= 90 || j >= 97))
//                            .limit(targetStringLength)
//                            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
//                            .toString() + "@dummy.com")
//                    .password("test")
//                    .nickname(random.ints(leftLimit, rightLimit + 1)
//                            .filter(j -> (j <= 57 || j >= 65) && (j <= 90 || j >= 97))
//                            .limit(targetStringLength)
//                            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
//                            .toString())
//                    .score((int)(Math.random()*2000))
//                    .totalGame(Long.valueOf(String.valueOf(Math.round(Math.random()*100 + 100))))
//                    .win(Long.valueOf(String.valueOf(Math.round(Math.random()*100))))
//                    .level((int)(Math.random()*100))
//                    .build();
//
//            user.encodePassword(passwordEncoder);
//            userRepository.save(user);
//        }
//    }
}
