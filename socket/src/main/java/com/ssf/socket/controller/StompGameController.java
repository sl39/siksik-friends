package com.ssf.socket.controller;

import com.ssf.socket.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Log4j2
@RestController
@RequiredArgsConstructor
public class StompGameController {
    private final SimpMessagingTemplate messageTemplate;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    private final ArrayList<String> problems = new ArrayList<>();
    private final ArrayList<String> result = new ArrayList<>();
    private final ArrayList<String> finalResult = new ArrayList<>();

    @MessageMapping("/game/{roomId}")
    public void gameStart(@DestinationVariable int roomId, @Payload ProblemsDTO body) {

        int time = 0;
        for (int i = 0; i < problems.size(); i++) {
            scheduler.schedule(() -> sendQuiz(roomId), time, TimeUnit.SECONDS); // 0, 23, 46, 69, ...
            time += 5;
            scheduler.schedule(() -> sendResult(roomId), time, TimeUnit.SECONDS); // 20, 43, 66, 89, ...
            time += 3;
        }
        scheduler.schedule(() -> endGame(roomId), time, TimeUnit.SECONDS); // 230 초 뒤에 게임 종료
    }

    public void sendQuiz(int roomId) {


        messageTemplate.convertAndSend("/sub/game/quiz" + roomId, problems);
    }
    public void sendResult(int roomId) {


        messageTemplate.convertAndSend("/sub/game/result" + roomId, result);
    }
    public void endGame(int roomId) {


        messageTemplate.convertAndSend("/sub/game/finalResult/" + roomId, finalResult);
    }

}