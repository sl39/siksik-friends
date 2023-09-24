package com.ssf.socket.controller;

import com.ssf.socket.dto.ChatMessageDTO;
import com.ssf.socket.dto.ProblemDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
public class StompGameController {
    private final SimpMessagingTemplate messageTemplate; //특정 Broker로 메세지를 전달

//    @MessageMapping("/room/{roomId}/1")
//    public void entrance(
//            @DestinationVariable int roomId,
//            @Payload ProblemDTO problemContent) {
//
//
//        log.info(roomId + "xx님이 입장");
//        log.info(problemContent.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemContent);
//    }
//
//    @MessageMapping("/room/{roomId}/2")
//    public void exit(
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
//    @MessageMapping("/room/{roomId}/3")
//    public void ready(
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
//    @MessageMapping("/room/{roomId}/4")
//    public void unready(
//            @DestinationVariable int roomId,
//            @Payload ResultDTO problemHint) {
//
//
//        log.info(roomId + "방의 최종 결과");
//        log.info(problemHint.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemHint);
//    }
//
//    @MessageMapping("/room/{roomId}/5")
//    public void gameStart(
//            @DestinationVariable int roomId,
//            @Payload ResultDTO problemHint) {
//
//
//        log.info(roomId + "방의 최종 결과");
//        log.info(problemHint.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemHint);
//    }
//
//    @MessageMapping("/room/{roomId}/6")
//    public void returning(
//            @DestinationVariable int roomId,
//            @Payload ResultDTO problemHint) {
//
//
//        log.info(roomId + "방의 최종 결과");
//        log.info(problemHint.toString());
//
//        messageTemplate.convertAndSend("/sub/room/" + roomId, problemHint);
//    }
//
//    @MessageMapping("/room/{roomId}/7")
//    public void breaking(
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