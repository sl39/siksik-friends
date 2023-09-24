package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProblemDTO {
    ProtocolDTO protocolType;

    int problemNumber;
    String problemContent;
    String problemHint;

}