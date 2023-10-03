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
    private final QuizSaveService quizSave;
    private final SimpMessagingTemplate messageTemplate;

    private final RoomRepository roomRepository = new MemoryRoomRepository();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private final ArrayList<String> finalResult = new ArrayList<>();



    @MessageMapping("/game/start/{roomId}")
    public void gameStart(@DestinationVariable int roomId,
                          @Payload Room body) {

        log.info("하이");

//        for (Member member : body.getMembers()) {
//            scoreRepository.saveMember(body.getRoomId(), member);
//        }
//
//        log.info(scoreRepository.findByRoomId(body.getRoomId()).toString());

        String category = body.getCategory();

        String date = body.getQuizDate();
        Quiz quizList = quizSave.getQuiz(date, category);

        log.info(quizList.getQuizSet().get(0).toString());

        scheduler.schedule(() -> loading(roomId), 0, TimeUnit.SECONDS); // 0, 23, 46, 69, ...

        int time = 3;
        for (int i = 0; i < quizList.getQuizSet().size(); i++) {
            int idx = i;
            scheduler.schedule(() -> sendQuiz(roomId, quizList.getQuizSet().get(idx)), time, TimeUnit.SECONDS); // 0, 23, 46, 69, ...
            time += 5;
            scheduler.schedule(() -> sendResult(roomId), time, TimeUnit.SECONDS); // 20, 43, 66, 89, ...
            time += 3;
        }
        scheduler.schedule(() -> endGame(roomId), time, TimeUnit.SECONDS); // 230 초 뒤에 게임 종료
    }

    public void loading(int roomId) {

        String start = "start!";

        messageTemplate.convertAndSend("/sub/game/quiz/" + roomId, start);
    }

    public void sendQuiz(int roomId, QuizDTO quiz) {

        messageTemplate.convertAndSend("/sub/game/quiz/" + roomId, quiz);
    }

    @PostMapping("/score")
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
    public void endGame(int roomId) {

        String end = "end!";

        messageTemplate.convertAndSend("/sub/game/end/" + roomId, end);
    }

}