import { useEffect, useState } from "react";
import type { Frame } from "stompjs";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import type { Room } from "@/types";
import styles from "./room.module.scss";

interface Props {
  room: Room;
}

export default function RoomData({ room }: Props) {
  const user = userAtom.init;

  return (
    <div className={styles.roomData}>
      <div className={styles.roomTitle}>방제목 {room?.roomName}</div>
      <div className={styles.roomSize}>
        최대인원 {room?.roomSize} - 현재 인원 {room?.roomCurrent}
      </div>
      <div className={styles.quizCount}>문제 수 {room?.quizCount}</div>
      <div className={styles.category}>문제유형 {room?.category}</div>
    </div>
  );
}
