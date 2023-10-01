package com.ssf.socket.controller;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Room;
import com.ssf.socket.dto.RoomDTO;
import com.ssf.socket.repository.MemoryRoomRepository;
import com.ssf.socket.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StompRoomController {
    private final RoomRepository roomRepository = new MemoryRoomRepository();
    private final SimpMessagingTemplate messageTemplate; //특정 Broker로 메세지를 전달
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    @PostMapping("/lobby")
    @CrossOrigin(origins = "*")
    public Room createRoom(
            @RequestBody Room body) {

        body.setRoomCurrent(1);
        Room createdRoom = roomRepository.save(body);
        List<Room> listRoom = roomRepository.findAll();

        scheduler.schedule(() -> messageTemplate.convertAndSend("/sub/room/roomList", listRoom), 100, TimeUnit.MILLISECONDS);

        return createdRoom;
    }

    @MessageMapping("/room/entrance/{roomId}")
    public void entranceRoom(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.memberEntrance(body);

        targetRoom.setRoomCurrent(targetRoom.getRoomCurrent() + 1);

        List<Room> listRoom = roomRepository.findAll();

        messageTemplate.convertAndSend("/sub/room/info/" + roomId, targetRoom);
        scheduler.schedule(() -> messageTemplate.convertAndSend("/sub/room/roomList", listRoom), 100, TimeUnit.MILLISECONDS);

    }

    @MessageMapping("/room/exit/{roomId}")
    public void exitRoom(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.memberExit(body);

        targetRoom.setRoomCurrent(targetRoom.getRoomCurrent() - 1);

        if (targetRoom.getRoomCurrent() == 0) {
            roomRepository.delete(targetRoom);
        } else {
            if (body.isLeader()) {
                targetRoom.getMembers().get(0).setLeader(true);
                messageTemplate.convertAndSend("/sub/room/info/" + roomId, targetRoom);
            }
        }

        List<Room> listRoom = roomRepository.findAll();

        scheduler.schedule(() -> messageTemplate.convertAndSend("/sub/room/roomList", listRoom), 100, TimeUnit.MILLISECONDS);

    }

    @MessageMapping("/room/ready/{roomId}")
    public void ready(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.readyMember(body);

        targetRoom.setRoomReady(targetRoom.getRoomReady() + 1);

        messageTemplate.convertAndSend("/sub/room/info/" + roomId, targetRoom);
    }

    @MessageMapping("/room/unready/{roomId}")
    public void unready(
            @DestinationVariable Long roomId,
            @Payload Member body) {

        Room targetRoom = roomRepository.findByRoomId(roomId).orElseThrow();

        targetRoom.unreadyMember(body);

        targetRoom.setRoomReady(targetRoom.getRoomReady() - 1);

        messageTemplate.convertAndSend("/sub/room/info/" + roomId, targetRoom);
    }

    @MessageMapping("/room/roomList")
    public void roomList() {

        List<Room> rooms = roomRepository.findAll();

        messageTemplate.convertAndSend("/sub/room/roomList", rooms);
    }
}