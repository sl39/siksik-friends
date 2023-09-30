package com.ssf.socket.repository;

import com.ssf.socket.domain.Member;

import java.util.List;

public interface LobbyRepository {
    void join(Member member);
    void out(Member member);
    List<Member> allLobbyMember();
}
