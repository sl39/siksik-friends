package com.ssf.socket.repository;

import com.ssf.socket.domain.Member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoryLobbyRepository implements LobbyRepository{
    public static Map<Long, Member> store = new HashMap<>();

    @Override
    public void join(Member member) {
        store.put(member.getUserId(), member);
    }

    @Override
    public void out(Member member) { store.remove(member.getUserId()); }

    @Override
    public List<Member> allLobbyMember() {

        return new ArrayList<>(store.values());
    }
}