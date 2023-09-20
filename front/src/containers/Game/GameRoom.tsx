"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { Room } from "@/types";
// import { serverAxios } from "@/services/api";
import GameRoomItem from "./GameRoomItem";
import styles from "./game.module.scss";
import EnterRoom from "./EnterRoom";

export default function GameRoom() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  // 방 전체 목록 받아오는 함수 작성하기

  /** 대기 중인 방만 보여주는 함수 */
  const showWaitingRooms = () => {
    setFilteredRooms(rooms.filter((room) => room.waiting));
  };
  /** 모든 방을 보여주는 함수 */
  const showAllRooms = () => {
    setFilteredRooms(rooms);
  };

  /** 방 목록 받아오기 */
  const fetchRoom = async () => {
    try {
      const response = await axios.get("/1");
      // const response = await serverAxios("");
      console.log(response);
      setRooms(response.data);
    } catch (err) {
      console.log("방 목록 에러", err);
      // 서버 요청 전 임시 Room
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
      showAllRooms();
    }
  };
  useEffect(() => {
    fetchRoom().then(showAllRooms);
    // 경고를 무시하거나 eslint 규칙을 임시적으로 끄는 주석
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
