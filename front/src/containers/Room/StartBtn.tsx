"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import type { CompatClient } from "node_modules/@stomp/stompjs";
import type { Room, SoketUser } from "@/types";
import { TotalInfoContext } from "@/socket/SubscriptionQuiz";
import styles from "./room.module.scss";

interface Props {
  gameId: number;
  soketUser: SoketUser;
  leaderReady: number;
  stompClient: CompatClient;
  room: Room | undefined;
}

export default function StartBtn({ gameId, soketUser, leaderReady, stompClient, room }: Props) {
  const [btnActive, setBtnActive] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { quiz, quizResult, end, roomInfoPlay } = useContext(TotalInfoContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [roomUser, setRoomUser] = useState<SoketUser>();

  const [title, setTitle] = useState("레디 하세요");

  /** 게임으로 연결하는 함수 */
  const handleStart = () => {
    setBtnActive(!btnActive);
    if (roomUser) {
      if (roomUser.leader) {
        if (leaderReady === 1) {
          // router.push(`/game/start/play/${gameId}`);
          stompClient.send(`/pub/game/start/${gameId}`, {}, JSON.stringify(roomInfoPlay || room));
        }
      } else if (roomUser.ready) {
        setRoomUser({ ...roomUser, ready: false });
        stompClient.send(`/pub/room/unready/${gameId}`, {}, JSON.stringify(roomUser));
      } else {
        setRoomUser({ ...roomUser, ready: true });
        stompClient.send(`/pub/room/ready/${gameId}`, {}, JSON.stringify(roomUser));
      }
    }
  };

  useEffect(() => {
    setRoomUser(soketUser);
    if (roomUser) {
      if (!roomUser.leader) {
        if (!roomUser.ready) {
          setTitle("준비");
        } else {
          setTitle("준비 해제");
        }
      } else if (leaderReady === 1) {
        setTitle("게임 시작!");
      } else {
        setTitle("준비 안 된 유저가 있습니다");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomUser, leaderReady]);

  return (
    <button onClick={handleStart} className={styles["button-wrapper"]}>
      <span
        className={`${styles.span} ${styles["background-button"]} ${btnActive ? styles.BtnActive : ""}`}
        title={title}
      />
    </button>
  );
}
