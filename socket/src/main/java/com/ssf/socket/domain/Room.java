package com.ssf.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Room {
    long roomId;
    String roomName;
    int roomSize;
    int roomCurrent;
    int roomReady;
    String category;
    int quizCount;
    String password;
    String quizDate;

    // 0 == Waiting, 1 == Playing
    int roomStatus;

    List<Member> members = new ArrayList<>();

    public void memberExit(Member outMember) {
        members.removeIf(e -> e.getUserId().equals(outMember.getUserId()));
    }

    public void memberEntrance(Member inMember) {
        members.add(inMember);
    }

    public void readyMember(Member targetMember) {
        for (Member member : members) {
            if (member.getUserId().equals(targetMember.getUserId())) {
                member.setReady(true);
            }
        }
    }
    public void unreadyMember(Member targetMember) {
        for (Member member : members) {
            if (member.getUserId().equals(targetMember.getUserId())) {
                member.setReady(false);
            }
        }
    }
}