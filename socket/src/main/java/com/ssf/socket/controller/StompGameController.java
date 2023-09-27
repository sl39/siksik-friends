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

    @MessageMapping("/game/{roomId}")
    public void gameStart(@DestinationVariable int roomId, @Payload ProblemsDTO body) {

        problems.add("문제1");
        problems.add("문제2");
        problems.add("문제3");
        problems.add("문제4");
        problems.add("문제5");

        int time = 0;
        for (int i = 0; i < problems.size(); i++) {
            scheduler.schedule(() -> sendQuiz(roomId), time, TimeUnit.SECONDS); // 0, 23, 46, 69, ...
            time += 2;
//            scheduler.schedule(() -> sendResult(roomId), time, TimeUnit.SECONDS); // 20, 43, 66, 89, ...
//            time += 1;
        }
        scheduler.schedule(() -> endGame(roomId), time, TimeUnit.SECONDS); // 230 초 뒤에 게임 종료
    }

    // 서비스의 메서드
    public void sendQuiz(int roomId) {

        // ProblemRepository 가져온 데이터 할당

        log.info(roomId + "번 문제 Quiz");
//        log.info(ProblemRepository에서 가져올 데이터.toString());

        ProblemsDTO dto = new ProblemsDTO();

//        messageTemplate.convertAndSend("/sub/room/result/" + roomId, ProblemRepository에서 가져올 데이터);
        messageTemplate.convertAndSend("/sub/room/result/" + roomId, dto);
    }
    public void sendResult(int roomId) {

        // ResultRepository 가져온 데이터 할당

        log.info(roomId + "번 문제 결과");
//        log.info(ResultRepository에서 가져올 데이터);

//        messageTemplate.convertAndSend("/sub/room/result/" + roomId, ResultRepository에서 가져올 데이터);
    }
    public void endGame(int roomId) {

        ReturningDTO returningDTO = new ReturningDTO("Returning");

        log.info(roomId + "번방 게임 끝");
//        log.info(Returning);

        messageTemplate.convertAndSend("/sub/room/result/" + roomId, returningDTO);
    }

//    @MessageMapping("/room/result/{roomId}")
//    public void sendResult(
//            @DestinationVariable int roomId,
//            @Payload ResultDTO body) {
//
//
//        log.info(roomId + "번 문제 결과");
//        log.info(body.toString());
//
//        messageTemplate.convertAndSend("/sub/room/result/" + roomId, body);
//    }
}