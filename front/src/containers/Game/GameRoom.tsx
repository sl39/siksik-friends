"use client";

import { useEffect, useState } from "react";
import type { Frame } from "stompjs";
import type { Room } from "@/types";
import { useWebSocket } from "@/socket/WebSocketProvider";
import type { CompatClient } from "@stomp/stompjs";
import GameRoomItem from "./GameRoomItem";
import styles from "./game.module.scss";
import EnterRoom from "./EnterRoom";

export default function GameRoom() {
  const [roomBtn, setRoomBtn] = useState(0);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  /** 대기 중인 방만 보여주는 함수 */
  const showWaitingRooms = async () => {
    setRoomBtn(1);
    await setFilteredRooms(rooms.filter((room) => !room.roomStatus));
  };
  /** 모든 방을 보여주는 함수 */
  const showAllRooms = async () => {
    setRoomBtn(0);
    await setFilteredRooms(rooms);
  };

  /** 방 전체 목록 받아오기 */

  const stompClient = useWebSocket();

  // lobby 들어갈때 메시지 보내기
  const refreshRoom = (StompClient: CompatClient) => {
    const message = {
      enter: "enter to lobby",
    };

    StompClient.send("/pub/room/roomList", {}, JSON.stringify(message));
  };

  useEffect(() => {
    // fetchRoom();
    if (stompClient) {
      // stompClient를 사용하여 채팅 메시지를 구독합니다.
      const subscription = stompClient.subscribe(
        "/sub/room/roomList",
        function handleRoomList(frame: Frame) {
          const recievdRoomList = JSON.parse(frame.body);
          console.log(recievdRoomList, "여기 새로운 방 생성 되면 들어오는곳");
          setRooms(recievdRoomList);
          if (roomBtn === 0) {
            setFilteredRooms(recievdRoomList);
          } else {
            setFilteredRooms(recievdRoomList.filter((room: Room) => !room.roomStatus));
          }
        },
        {}
      );
      refreshRoom(stompClient);
      return () => {
        // 컴포넌트가 언마운트될 때 구독을 언서브스크라이브합니다.
        subscription.unsubscribe();
      };
    }
    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);

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
        {/* <button className={[styles.reload].join(" ")} onClick={showAllRooms}>
          새로고침
        </button> */}
      </div>
      <div className={styles.rooms}>{filteredRooms?.map((room) => <GameRoomItem key={room.roomId} room={room} />)}</div>
    </>
  );
}
