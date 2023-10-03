import { useEffect, useState } from "react";
import type { Frame } from "stompjs";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import type { Room } from "@/types";
import styles from "./room.module.scss";

interface Props {
  roomId: number;
}

export default function RoomData({ roomId }: Props) {
  const stompClient = useWebSocket();
  const [room, setRoom] = useState<Room>();
  const user = userAtom.init;
  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/sub/room/info/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const roomInfo = JSON.parse(frame.body);
          console.log(roomInfo);
          setRoom(roomInfo);
        },
        {}
      );
      const soketUser = {
        userId: user.user_id,
        userName: user.nickname,
        userScore: user.score,
        userRanking: user.rank,
        ready: false,
        leader: false,
      };
      stompClient.send(`/pub/room/entrance/${roomId}`, {}, JSON.stringify(soketUser));
      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        window.removeEventListener("beforeunload", () => {
          stompClient.send(`/pub/room/exit/${roomId}`, {}, JSON.stringify(soketUser));
          subscription.unsubscribe();
        });
        stompClient.send(`/pub/room/exit/${roomId}`, {}, JSON.stringify(soketUser));
        subscription.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);

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