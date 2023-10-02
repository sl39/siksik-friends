package com.ssf.socket.controller;

import com.ssf.socket.domain.Quiz;
import com.ssf.socket.domain.Room;
//import com.ssf.socket.repository.MemoryQuizRepository;
import com.ssf.socket.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StompQuizController {
    private final SimpMessagingTemplate messageTemplate;
//    private final QuizRepository quizRepository = new MemoryQuizRepository();

//    @MessageMapping("/game/quiz/{roomId}")
//    public void takeQuiz(
//            @DestinationVariable int roomId,
//            @Payload Room body) {
//
//        if (body.getCategory().equals("경제")) {
//
//            Quiz quiz =
//
//        } else if (body.getCategory().equals("사회")) {
//
//        } else if (body.getCategory().equals("생활/문화")) {
//
//        } else if (body.getCategory().equals("세계")) {
//
//        } else {
//
//        }
//
//        messageTemplate.convertAndSend("/sub/game/start/" + roomId, quiz);
//    }
}
