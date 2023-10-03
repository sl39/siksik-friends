package com.ssf.socket.repository;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Room;
import com.ssf.socket.dto.ReplyDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class MemoryScoreRepository implements ScoreRepository{

    private final Map<Long, Member> store = new HashMap<>();

    @Override
    public void saveMember(Long roomId, Member member) {
        store.put(roomId, member);
    }
    @Override
    public void saveScore(long roomId, long userId) {
        store.get(roomId).setGameScore(+100);

    }

    @Override
    public Optional<Member> findByRoomId(long roomId) {

        return Optional.ofNullable(store.get(roomId));
    }

//    @Override
//    public void deleteScore(ReplyDTO replyDto) {
//        store.remove(e -> e.getUserId().equals(outMember.getUserId()));
//    }

}
