package com.ssf.socket.controller;

import com.ssf.socket.domain.Member;
import com.ssf.socket.repository.LobbyRepository;
import com.ssf.socket.repository.MemoryLobbyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
public class StompLobbyController {
    private final LobbyRepository lobbyRepository = new MemoryLobbyRepository();
    private final SimpMessagingTemplate messageTemplate;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    @MessageMapping("/lobby/entrance")
    public void entranceLobby(
            @Payload Member body) {

        lobbyRepository.join(body);
        List<Member> lobbyMembers = lobbyRepository.allLobbyMember();

        scheduler.schedule(() -> messageTemplate.convertAndSend("/sub/lobby/list", lobbyMembers), 100, TimeUnit.MILLISECONDS);
    }

    @MessageMapping("/lobby/exit")
    public void exitLobby(
            @Payload Member body) {

        lobbyRepository.out(body);
        List<Member> lobbyMembers = lobbyRepository.allLobbyMember();

        scheduler.schedule(() -> messageTemplate.convertAndSend("/sub/lobby/list", lobbyMembers), 100, TimeUnit.MILLISECONDS);
    }
}
