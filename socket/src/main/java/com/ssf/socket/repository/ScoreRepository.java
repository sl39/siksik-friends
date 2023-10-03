package com.ssf.socket.repository;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Room;
import com.ssf.socket.dto.ReplyDTO;

import java.util.Optional;

public interface ScoreRepository {

    void saveMember(Long roomId, Member member);
    void saveScore(long roomId, long userId);

    Optional<Member> findByRoomId(long roomId);

//    void deleteScore(long roomId);
}
