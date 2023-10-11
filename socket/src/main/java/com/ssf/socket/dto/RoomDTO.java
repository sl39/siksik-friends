package com.ssf.socket.dto;

import com.ssf.socket.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RoomDTO {
    Long roomId;
    String category;
    int quizCount;
    String password;
    LocalDateTime quizDateTime;
    List<Member> members = new ArrayList<>();
}