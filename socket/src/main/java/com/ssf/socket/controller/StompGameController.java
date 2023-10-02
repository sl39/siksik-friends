package com.ssf.socket.controller;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Quiz;
import com.ssf.socket.domain.Room;
import com.ssf.socket.dto.*;
import com.ssf.socket.service.QuizSaveService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StompGameController {
    private final QuizSaveService quizSave;
    private final SimpMessagingTemplate messageTemplate;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private final ArrayList<String> result = new ArrayList<>();
    private final ArrayList<String> finalResult = new ArrayList<>();



    @MessageMapping("/game/start/{roomId}")
    public void gameStart(@DestinationVariable int roomId,
                          @Payload Room body) {

        log.info("하이");

        String category = body.getCategory();

        String date = body.getQuizDate();
        Quiz quizList = quizSave.getQuiz(date, category);

        log.info(quizList.getQuizSet().get(0).toString());

        int time = 0;
        for (int i = 0; i < quizList.getQuizSet().size(); i++) {
            int idx = i;
            scheduler.schedule(() -> sendQuiz(roomId, quizList.getQuizSet().get(idx)), time, TimeUnit.SECONDS); // 0, 23, 46, 69, ...
            time += 10;
            scheduler.schedule(() -> sendResult(roomId), time, TimeUnit.SECONDS); // 20, 43, 66, 89, ...
            time += 5;
        }
        scheduler.schedule(() -> endGame(roomId), time, TimeUnit.SECONDS); // 230 초 뒤에 게임 종료
    }

    public void sendQuiz(int roomId, QuizDTO quiz) {

        messageTemplate.convertAndSend("/sub/game/quiz/" + roomId, quiz);
    }

    @PostMapping("/score")
    public void scoreCalculation(QuizDTO quiz, ReplyDTO replyDto) {
        if (quiz.getAnswer().equals(replyDto.getAnswer())) {
            replyDto.setUserScore(replyDto.getUserScore()+100);
        }
    }

    public void sendResult(int roomId) {

        messageTemplate.convertAndSend("/sub/game/result/" + roomId, result);
    }
    public void endGame(int roomId) {


        messageTemplate.convertAndSend("/sub/game/finalResult/" + roomId, finalResult);
    }

}