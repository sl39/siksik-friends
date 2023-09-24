package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResultDTO {
    ProtocolDTO protocolType;

    int ranking;
    String userName;
    int score;

}
