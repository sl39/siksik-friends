"use client";

// import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
// import { roomAtom } from "@/store/gameAtom";
import { useState } from "react";
import WebSocketProvider from "@/socket/WebSocketProvider";
import styles from "./room.module.scss";
import RoomInfo from "./RoomInfo";
import Chatting from "./Chatting";

export default function Index() {
  // 방 정보
  // const room = useAtom(roomAtom)[0];

  const params = useParams();
  const roomId = Number(params.id);

  const router = useRouter();
  // 내가 시작을 한지 여부
  const [btnActive, setBtnActive] = useState(false);

  const ImBoss = false;
  let data = "";
  /** 게임으로 연결하는 함수 */
  if (ImBoss) {
    data = "게임 시작!";
  } else {
    data = "Ready!";
  }
  const handleStart = () => {
    // 내가 방장이고, 모두가 준비 되었으면 "게임 시작!", 모두 게임으로 입장 어케함?
    if (ImBoss) {
      // 모두가 준비 되었는 지 확인
      router.push(`/game/play/${roomId}`);
    } else {
      // 방장이 아니면, Ready <-> 해제 번갈아서
      setBtnActive(!btnActive);
    }
  };

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
          <button onClick={handleStart} className={`${styles["button-wrapper"]}`}>
            <span
              className={`${styles.span} ${styles["background-button"]} ${btnActive ? styles.BtnActive : ""}`}
              title={data}
            />
          </button>
        </div>
      </div>
    </WebSocketProvider>
  );
}
