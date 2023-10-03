"use client";

import { useRouter } from "next/navigation";
import styles from "./room.module.scss";
import { soketUser } from "@/types";
import { useEffect, useState } from "react";
import { CompatClient } from "node_modules/@stomp/stompjs";

interface Props {
  gameId: number;
  soketUser: soketUser;
  leaderReady: number;
  stompClient: CompatClient;
}

export default function StartBtn({ gameId, soketUser, leaderReady, stompClient }: Props) {
  console.log(soketUser, "유저 값 받아오는곳 버튼");
  const router = useRouter();
  const [roomUser, setRoomUser] = useState<soketUser>(soketUser);

  const [title, setTitle] = useState("레디 하세요");
  /** 게임으로 연결하는 함수 */
  const handleStart = () => {
    console.log(soketUser.ready, "이거 맞나?");

    if (roomUser.leader) {
      if (leaderReady === 1) {
        router.push(`/game/play/${gameId}`);
      }
    } else {
      if (roomUser.ready) {
        setRoomUser({ ...roomUser, ready: false });
        console.log(roomUser, "여기는 ready 였을때");
      } else {
        setRoomUser({ ...roomUser, ready: true });
        console.log(roomUser, "여기는 ready가 안될때");
      }
      stompClient.send(`/pub/room/ready/${gameId}`, {}, JSON.stringify(roomUser));
    }
  };
  useEffect(() => {
    console.log(roomUser, "여기는 props 받아온곳");
    if (!roomUser.leader) {
      if (!roomUser.ready) {
        setTitle("레디 하세요");
      } else {
        setTitle("레디 중입니다");
      }
    } else {
      if (leaderReady === 1) {
        setTitle("게임 시작!");
      }
      {
        setTitle("모든 유저가 레디 하지 않았습니다");
      }
    }
  }, [roomUser]);

  return (
    <button onClick={handleStart} className={styles["button-wrapper"]}>
      <span className={`${styles.span} ${styles["background-button"]}`} title={title} />
    </button>
  );
}
