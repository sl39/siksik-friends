package com.ssf.socket.controller;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Quiz;
import com.ssf.socket.domain.Room;
import com.ssf.socket.dto.*;
import com.ssf.socket.repository.MemoryRoomRepository;
import com.ssf.socket.repository.RoomRepository;
import com.ssf.socket.service.QuizSaveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StompGameController {
    private final QuizSaveService quizSaveService;
    private final SimpMessagingTemplate messageTemplate;
    private final RedisTemplate<String, String> redisTemplate;

    private final RoomRepository roomRepository = new MemoryRoomRepository();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();


    @MessageMapping("/game/start/{roomId}")
    public void gameStart(@DestinationVariable int roomId,
                          @Payload Room body) {

        String category = body.getCategory();

        String date = body.getQuizDate();
        Quiz quizList = quizSaveService.getQuiz(date, category);

        scheduler.schedule(() -> loading(roomId), 0, TimeUnit.SECONDS); // 0, 23, 46, 69, ...

        int time = 3;
        for (int i = 0; i < quizList.getQuizSet().size(); i++) {
            int idx = i;
            scheduler.schedule(() -> sendQuiz(roomId, quizList.getQuizSet().get(idx)), time, TimeUnit.SECONDS);
            time += 1;
            scheduler.schedule(() -> sendResult(roomId), time, TimeUnit.SECONDS);
            time += 1;
        }
        scheduler.schedule(() -> endGame(roomId, quizList.getQuizSet()), time, TimeUnit.SECONDS);
    }

    public void loading(int roomId) {

        String start = "start!";

        messageTemplate.convertAndSend("/sub/game/quiz/" + roomId, start);
    }

    public void sendQuiz(int roomId, QuizDTO quiz) {

        messageTemplate.convertAndSend("/sub/game/quiz/" + roomId, quiz);
    }

    @PostMapping("/socket/score")
    @CrossOrigin(origins = "*")
    public List<Member> scoreCalculation(
            @RequestBody ReplyDTO replyDto) {
        if (replyDto.getAnswer().equals(replyDto.getUserAnswer())) {
            roomRepository.saveScore(replyDto.getRoomId(), replyDto.getUserId());
        }
        return roomRepository.findByRoomId(replyDto.getRoomId()).orElseThrow().getMembers();
    }

    public void sendResult(long roomId) {

        List<Member> result = roomRepository.findByRoomId(roomId).orElseThrow().getMembers();

        result.sort(Comparator.comparingInt(e -> -e.getGameScore()));

        messageTemplate.convertAndSend("/sub/game/result/" + roomId, result);
    }
    public void endGame(int roomId, List<QuizDTO> quizzes) {

        String end = "end!";

        log.info("end 되나");

        List<Member> members = roomRepository.findByRoomId(roomId).orElseThrow().getMembers();

        quizSaveService.pushMember(roomId, members);

        for (Member member : members) {
            redisTemplate.opsForZSet().incrementScore("rank", member.getUserId().toString(), member.getGameScore());
        }

        log.info("end 되나2");

        try {
            for (QuizDTO quiz : quizzes) {

                log.info("end 되나4");

                quizSaveService.pushHistory(roomId, quiz);
            }
        } catch (Exception ex) {
            // 예외 처리: 예외 정보를 로그에 기록
            log.info("안되네"); // 또는 로깅 프레임워크를 사용하여 로그에 기록
            // 예외 처리를 위한 추가 작업을 수행할 수 있습니다.
        }

//        for (QuizDTO quiz : quizzes) {
//
//            log.info("end 되나4");
//
//            quizSaveService.pushHistory(roomId, quiz);
//        }

        log.info("end 되나3");


        messageTemplate.convertAndSend("/sub/game/end/" + roomId, end);
    }

}