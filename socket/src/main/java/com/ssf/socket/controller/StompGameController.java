package com.ssf.socket.controller;

import com.ssf.socket.dto.ProblemsDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

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
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);;

    @MessageMapping("/game/{roomId}")
    public void gameStart(@DestinationVariable int roomId, @Payload ProblemsDTO body) {

        List<String> problems = new ArrayList<>();
        problems.add("문제");
        int time = 0;
        for (int i = 0; i < problems.size(); i++) {
            scheduler.schedule(() -> 문제_뿌리기(), time, TimeUnit.MILLISECONDS); // 0, 23, 46, 69, ...
            time += 20000;
            scheduler.schedule(() -> 결과_뿌리기(), time, TimeUnit.MILLISECONDS); // 20, 43, 66, 89, ...
            time += 20000;
        }
        scheduler.schedule(() -> 게임_종료(), time, TimeUnit.MILLISECONDS); // 230 초 뒤에 게임 종료
    }

    // 서비스의 메서드
    public void 문제_뿌리기() {

    }
    public void 결과_뿌리기() {

    }
    public void 게임_종료() {

    }
}