package com.ssf.socket.controller;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Room;
import com.ssf.socket.dto.RoomDTO;
import com.ssf.socket.repository.MemoryRoomRepository;
import com.ssf.socket.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Log4j2
@RestController
@RequiredArgsConstructor
public class StompRoomController {
    private final RoomRepository roomRepository = new MemoryRoomRepository();
    private final SimpMessagingTemplate messageTemplate; //특정 Broker로 메세지를 전달
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    @PostMapping("/lobby")
    public Room createRoom(
            @RequestBody Room body) {

        Room createdRoom = roomRepository.save(body);
        List<Room> listRoom = roomRepository.findAll();

        scheduler.schedule(() -> messageTemplate.convertAndSend("/sub/room/create", listRoom), 100, TimeUnit.MILLISECONDS);

        return createdRoom;
    }

    @MessageMapping("/room/entrance/{roomId}")
    public void entranceRoom(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.memberEntrance(body);

        List<Member> members = targetRoom.getMembers();

        messageTemplate.convertAndSend("/sub/room/member/" + roomId, members);
    }

    @MessageMapping("/room/exit/{roomId}")
    public void exitRoom(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        boolean isEmpty = targetRoom.memberExit(body);

        if (isEmpty) {
            roomRepository.delete(targetRoom);
        }

        List<Member> members = targetRoom.getMembers();

        messageTemplate.convertAndSend("/sub/room/member/" + roomId, members);
    }

    @MessageMapping("/room/ready/{roomId}")
    public void ready(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.readyMember(body);

        List<Member> members = targetRoom.getMembers();

        messageTemplate.convertAndSend("/sub/room/member/" + roomId, members);
    }

    @MessageMapping("/room/unready/{roomId}")
    public void unready(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.unreadyMember(body);

        List<Member> members = targetRoom.getMembers();

        messageTemplate.convertAndSend("/sub/room/member/" + roomId, members);
    }

    @MessageMapping("/room/roomList")
    public void roomList(
            @Payload Room body) {

        List<Room> rooms = roomRepository.findAll();

        messageTemplate.convertAndSend("/sub/room/roomList", rooms);
    }
}