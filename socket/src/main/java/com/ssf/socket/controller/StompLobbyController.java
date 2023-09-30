package com.ssf.socket.controller;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Room;
import com.ssf.socket.repository.LobbyRepository;
import com.ssf.socket.repository.MemoryLobbyRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class StompLobbyController {
//    private final LobbyRepository lobbyRepository = new MemoryLobbyRepository();
//    private final SimpMessagingTemplate messageTemplate;
//    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor()
//    @MessageMapping("/room/entrance")
//    public void entrance(
//            @DestinationVariable Long roomId,
//            @Payload Member body) {
//
//        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();
//
//        targetRoom.memberEntrance(body);
//
//        List<Member> members = targetRoom.getMembers();
//
//        messageTemplate.convertAndSend("/sub/room/entrance", members);
//    }
//
//    @MessageMapping("/room/exit")
//    public void exit(
//            @DestinationVariable Long roomId,
//            @Payload Member body) {
//
//        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();
//
//        boolean isEmpty = targetRoom.memberExit(body);
//
//        if (isEmpty) {
//            roomRepository.delete(targetRoom);
//        }
//
//        List<Member> members = targetRoom.getMembers();
//
//        messageTemplate.convertAndSend("/sub/room/exit", members);
//    }
}
