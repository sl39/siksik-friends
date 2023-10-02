package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReplyDTO {
    int roomId;
    Long userId;
    String answer;
    int userScore;
}
