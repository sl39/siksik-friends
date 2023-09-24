package com.ssf.socket.controller;

import com.ssf.socket.dto.ProblemDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
public class StompRoomController {

//    @MessageMapping("/room/{roomId}/show_problem")
//    public void showProblem(
//            @DestinationVariable int roomId,
//            @Payload ProblemDTO problemContent) {
//
//
//        log.info(roomId + "방의 문제");
//        log.info(problemContent.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemContent);
//    }
//
//    @MessageMapping("/room/{roomId}/show_hint")
//    public void showProblemHint(
//            @DestinationVariable int roomId,
//            @Payload ProblemDTO problemHint) {
//
//
//        log.info(roomId + "방의 힌트");
//        log.info(problemHint.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemHint);
//    }
//
//    @MessageMapping("/room/{roomId}/9")
//    public void showProblemResult(
//            @DestinationVariable int roomId,
//            @Payload ResultDTO problemHint) {
//
//
//        log.info(roomId + "방의 n번 문제 결과");
//        log.info(problemHint.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemHint);
//    }
//
//    @MessageMapping("/room/{roomId}/10")
//    public void showFinalResult(
//            @DestinationVariable int roomId,
//            @Payload ResultDTO problemHint) {
//
//
//        log.info(roomId + "방의 최종 결과");
//        log.info(problemHint.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemHint);
//    }
}