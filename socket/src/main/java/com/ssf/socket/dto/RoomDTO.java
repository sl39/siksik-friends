package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class RoomDTO {
    ProtocolDTO protocolType;

    int roomNumber;
    ArrayList<String> memberName;

}
