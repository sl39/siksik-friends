package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TimeDTO {
    ProtocolDTO protocolType;

    int solvingTime;
    int resultTime;

}
