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
      <div>방제목 {room?.roomName}</div>
      <div>
        최대인원 {room?.roomSize} - 현재 인원 {room?.roomCurrent}
      </div>
      <div>문제 수 {room?.quizCount}</div>
      <div>문제유형 {room?.category}</div>
    </div>
  );
}
