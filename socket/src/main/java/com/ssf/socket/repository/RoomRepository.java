package com.ssf.socket.repository;

import com.ssf.socket.domain.Room;

import java.util.List;
import java.util.Optional;

public interface RoomRepository {
    Room save(Room room);
    void delete(Room room);
    Optional<Room> findByRoomId(Long roomId);
    List<Room> findAll();
}