package com.ssf.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Member {

    private Long userId;
    private String userName;
    private int gameScore;
    private int userScore;
    private int userRanking;

    // True == 방장, False == 일반
    private boolean isLeader;

    // True == 레디, False == 언레디
    private boolean isReady;
}
