"use client";

import { useAtom } from "jotai";
import { roomAtom } from "@/store/gameAtom";
import StartBtn from "./StartBtn";
import styles from "./room.module.scss";
import RoomInfo from "./RoomInfo";

export default function Index() {
  // 방 정보
  const room = useAtom(roomAtom)[0];

  // 이거 받아와야함
  const gameId = 1;

  return (
    <>
      <div className={styles.left}>
        <div className={styles.roomInfo}>
          <RoomInfo room={room} />
        </div>
        <div className={styles.chatting}>채팅창</div>
      </div>
      <div className={styles.right}>
        <div className={styles.roomUser}>{/* 그거 컴포넌트 정리해서 가져오기 */}</div>
        <div className={styles.startBtn}>
          레디 / 취소 , 시작 버튼 ||
          <StartBtn gameId={gameId} />
        </div>
      </div>
    </>
  );
}
