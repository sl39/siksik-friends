package com.ssf.member.domain.user.service;

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
public class UserFindServiceImpl implements UserFindService {

    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto.Detail findUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(null);

        return UserDto.Detail.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .level(user.getLevel())
                .rank(user.getRank())
                .score(user.getScore())
                .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame()))
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
                    .odds(user.getTotalGame() == 0L ? (user.getWin() == 0L ? "0.0%" : "100.0%") : String.format("%.1f%%", user.getWin() / (double) user.getTotalGame()))
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
