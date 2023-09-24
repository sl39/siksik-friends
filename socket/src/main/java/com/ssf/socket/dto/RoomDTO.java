package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RoomDTO {
    ProtocolDTO protocolType;

    int roomNumber;
    String userName;

}
