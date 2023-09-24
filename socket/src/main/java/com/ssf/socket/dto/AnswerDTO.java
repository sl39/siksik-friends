package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnswerDTO {
    ProtocolDTO protocolType;

    String answer;
}
