package com.ssf.socket.controller;

import com.ssf.socket.dto.RoomDTO;
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
public class StompRoomController {
    private final SimpMessagingTemplate messageTemplate; //특정 Broker로 메세지를 전달

    @MessageMapping("/room/member/{roomId}")
    public void member(
            @DestinationVariable int roomId,
            @Payload RoomDTO body) {


        log.info(roomId + "번 방 멤버");
        log.info(body.toString());

        messageTemplate.convertAndSend("/sub/room/member/" + roomId, body);
    }
}