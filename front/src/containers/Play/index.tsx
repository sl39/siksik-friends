"use client";

import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { roomAtom } from "@/store/gameAtom";
import { useWebSocket } from "@/socket/WebSocketProvider";
import type { Quiz } from "@/types";
import type { Frame } from "stompjs";
import Timer from "./Timer";
import styles from "./play.module.scss";
import Question from "./Question";
import Score from "./Score";
import Chatting from "../Room/Chatting";
import { TotalInfoContext } from "@/socket/SubscriptionQuiz";

export default function GamePlay() {
  const [gameData] = useAtom(roomAtom);
  const params = useParams();
  const roomId = Number(params.id);
  const [time] = useState<number>(3);
  // 문제 정보 받아오기
  const StompClient = useWebSocket();
  // eslint-disable-next-line no-null/no-null
  const { quiz, quizResult, end, roomInfoPlay } = useContext(TotalInfoContext);
  console.log(quiz, quizResult, end, roomInfoPlay);

  // 현재 스코어 상태 받아오기
  const scoreData = [
    { name: "1등", score: 11 },
    { name: "2등", score: 11 },
    { name: "3등", score: 11 },
    { name: "4등", score: 11 },
    { name: "5등", score: 11 },
    { name: "6등", score: 11 },
    { name: "7등", score: 11 },
    { name: "8등", score: 11 },
    { name: "9등", score: 11 },
    { name: "10등", score: 11 },
  ];

  // eslint-disable-next-line consistent-return

  // 모든 문제가 끝나면 결과 페이지로 이동;
  // const router = useRouter();
  // router.push(`/game/rank/${roomId}`);

  return (
    <div className={styles.flex}>
      <div className={styles.top}>
        <Timer time={gameData.countTimer} resetTime={time} count={gameData.countProblem} />
      </div>
      <div className={styles.flex2}>
        <div className={styles.left}>
          <Score data={scoreData} />
        </div>
        <div className={styles.center}>
          <Question data={quiz} />
        </div>
        <div className={styles.right}>
          {/* room이랑 같은 채팅 */}
          <Chatting roomId={roomId} />
        </div>
      </div>
    </div>
  );
}
