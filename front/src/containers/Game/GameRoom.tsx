"use client";

import { useEffect, useState } from "react";
import type { Room } from "@/types";
import GameRoomItem from "./GameRoomItem";
import styles from "./game.module.scss";
import EnterRoom from "./EnterRoom";

export default function GameRoom() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  // 방 전체 목록 받아오는 함수 작성하기
  /** 방 목록 받아오기 */
  const fetchRoom = async () => {
    setRooms([
      { id: 1, name: "ㄱㄱ", waiting: true },
      { id: 2, name: "ㄱㄱ", waiting: false },
      { id: 21, name: "ㄱㄱ", waiting: false },
      { id: 22, name: "ㄱㄱ", waiting: false },
      { id: 23, name: "ㄱㄱ", waiting: false },
      { id: 235, name: "ㄱㄱ", waiting: false },
      { id: 2351, name: "ㄱㄱ", waiting: false },
      { id: 2352, name: "ㄱㄱ", waiting: false },
    ]);
  };

  /** 대기 중인 방만 보여주는 함수 */
  const showWaitingRooms = () => {
    setFilteredRooms(rooms.filter((room) => room.waiting));
  };
  /** 모든 방을 보여주는 함수 */
  const showAllRooms = () => {
    setFilteredRooms(rooms);
  };

  useEffect(() => {
    fetchRoom();
    showAllRooms();
  }, []);

  return (
    <div className={styles.GameRoom}>
      <div className={styles.roomBtn}>
        <EnterRoom />
      </div>
      <div className={styles.roomActionBtn}>
        <div>
          <button className={styles.roundButton} onClick={showAllRooms}>
            모든 방 보기
          </button>
          <button className={styles.roundButton} onClick={showWaitingRooms}>
            대기 방 보기
          </button>
        </div>
        <button className={[styles.roundButton, styles.reload].join(" ")} onClick={fetchRoom}>
          새로고침
        </button>
      </div>
      <div className={styles.rooms}>{filteredRooms?.map((room) => <GameRoomItem key={room.id} room={room} />)}</div>
    </div>
  );
}
