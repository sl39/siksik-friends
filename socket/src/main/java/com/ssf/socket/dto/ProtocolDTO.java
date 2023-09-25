package com.ssf.socket.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProtocolDTO {
    // 채팅 관련 Protocol
    CHAT("chat", 0),

    // 방 관련 Protocol
    ENTRANCE("entrance", 1),
    EXIT("exit", 2),

    READY("ready", 3),
    UNREADY("unready", 4),
    GAME_START("game_start", 5),

    RETURNING("return_room", 6),
    BREAKING("room_break", 7),

    // 게임 관련 Protocol
    SHOW_PROBLEM("send_problem", 8),
    SHOW_PROBLEM_RESULT("send_problem_result", 9),
    SHOW_FINAL_RESULT("send_problem_result", 10),
;

    private final String protocol;
    private final int value;
}