"use client";

import { useEffect, useState } from "react";
import type { Room } from "@/types";
import GameRoomItem from "./GameRoomItem";
import styles from "./game.module.scss";
import EnterRoom from "./EnterRoom";

export default function GameRoom() {
  const [roomBtn, setRoomBtn] = useState(-1);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  /** 대기 중인 방만 보여주는 함수 */
  const showWaitingRooms = async () => {
    setRoomBtn(1);
    await setFilteredRooms(rooms.filter((room) => room.waiting));
  };
  /** 모든 방을 보여주는 함수 */
  const showAllRooms = async () => {
    setRoomBtn(0);
    await setFilteredRooms(rooms);
  };

  /** 방 전체 목록 받아오기 */
  const fetchRoom = async () => {
    try {
      // 소켓에서 받아오기
      // const response = await axios.get("/1");
      // setRooms(response.data);

      // 서버 요청 전 더미 데이터
      setRooms([
        { id: 1, name: "더미1", waiting: true },
        { id: 2, name: "더미2", waiting: true },
        { id: 3, name: "더미3", waiting: false },
        { id: 4, name: "더미4", waiting: false },
        { id: 5, name: "더미5", waiting: true },
        { id: 6, name: "더미6", waiting: true },
        { id: 7, name: "더미7", waiting: false },
        { id: 82, name: "더미8", waiting: false },
      ]);
    } catch (err) {
      console.log("방 목록 에러", err);
    }
    showAllRooms();
  };

  useEffect(() => {
    fetchRoom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.roomBtn}>
        <EnterRoom rooms={rooms} />
      </div>
      <div className={styles.roomActionBtn}>
        <div>
          <button className={`${styles.roundButton} ${roomBtn === 0 ? styles.activeRoom : ""}`} onClick={showAllRooms}>
            모든 방 보기
          </button>
          <button
            className={`${styles.roundButton} ${roomBtn === 1 ? styles.activeRoom : ""}`}
            onClick={showWaitingRooms}
          >
            대기 방 보기
          </button>
        </div>
        {/* <button className={[styles.reload].join(" ")} onClick={fetchRoom}>
          새로고침
        </button> */}
      </div>
      <div className={styles.rooms}>{filteredRooms?.map((room) => <GameRoomItem key={room.id} room={room} />)}</div>
    </>
  );
}
