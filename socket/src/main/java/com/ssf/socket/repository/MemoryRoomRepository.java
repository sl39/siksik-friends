package com.ssf.socket.repository;

import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Room;

import java.util.*;

public class MemoryRoomRepository implements RoomRepository{
    private static Map<Long, Room> store = new HashMap<>();
    private static long roomCount;

    @Override
    public void saveScore(Long roomId, long userId) {
        for (Member member : store.get(roomId).getMembers()) {
            if (userId == member.getUserId()) {
                member.setGameScore(member.getGameScore() + 100);
            }
        }
    }
    @Override
    public Room save(Room room) {
        store.put(++roomCount, room);
        room.setRoomId(roomCount);
        return room;
    }

    @Override
    public void delete(Room room) {
        store.remove(room.getRoomId());
    }

    @Override
    public Optional<Room> findByRoomId(Long id) {

        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Room> findAll() {

        return new ArrayList<>(store.values());
    }

    @Override
    public List<Room> terminate() {

        store.clear();

        return new ArrayList<>(store.values());
    }
}