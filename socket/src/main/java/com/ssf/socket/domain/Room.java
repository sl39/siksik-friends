package com.ssf.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Room {
    long roomId;
    String roomName;
    String category;
    int quizCount;
    String password;
    LocalDateTime quizDateTime;
    // 0 == Waiting, 1 == Playing
    int roomStatus;
    List<Member> members = new ArrayList<>();

    public boolean memberExit(Member outMember) {
        members.removeIf(e -> e.getUserName().equals(outMember.getUserName()));
        return members.isEmpty();
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