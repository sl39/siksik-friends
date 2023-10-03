"use client";

// import { useAtom } from "jotai";
import { useParams } from "next/navigation";
// import { roomAtom } from "@/store/gameAtom";
import WebSocketProvider from "@/socket/WebSocketProvider";
import StartBtn from "./StartBtn";
import styles from "./room.module.scss";
import RoomInfo from "./RoomInfo";
import Chatting from "./Chatting";

export default function Index() {
  // 방 정보
  // const room = useAtom(roomAtom)[0];

  const params = useParams();
  console.log(params);
  const roomId = Number(params.id);

  return (
    <WebSocketProvider>
      <div className={styles.left}>
        <div className={styles.roomInfo}>
          <RoomInfo roomId={roomId} />
        </div>
        <div className={styles.chatting}>
          <Chatting roomId={roomId} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.roomUser}>{/* 그거 컴포넌트 정리해서 가져오기 */}</div>
        <div className={styles.startBtn}>
          레디 / 취소 , 시작 버튼 ||
          <StartBtn gameId={roomId} />
        </div>
      </div>
    </WebSocketProvider>
  );
}
