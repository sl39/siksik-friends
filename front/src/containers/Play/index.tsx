"use client";

import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roomAtom } from "@/store/gameAtom";
import { useWebSocket } from "@/socket/WebSocketProvider";
import type { Quiz } from "@/types";
import type { Frame } from "stompjs";
import Timer from "./Timer";
import styles from "./play.module.scss";
import Question from "./Question";
import Score from "./Score";
import Chatting from "../Room/Chatting";

export default function GamePlay() {
  const [gameData] = useAtom(roomAtom);
  const params = useParams();
  const roomId = Number(params.id);
  const [time] = useState<number>(3);
  // 문제 정보 받아오기
  const StompClient = useWebSocket();
  // eslint-disable-next-line no-null/no-null
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  // 현재 스코어 상태 받아오기

  const scoreData = [
    {
      userId: 11,
      userName: "z상식지존z",
      gameScore: 600,
      userScore: 9999,
      userRanking: 1,
      leader: true,
      ready: false,
    },
    {
      userId: 12,
      userName: "z상식지존z11",
      gameScore: 300,
      userScore: 789,
      userRanking: 103,
      leader: false,
      ready: false,
    },
  ];

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (StompClient) {
      const subscription = StompClient.subscribe(
        `/sub/game/quiz/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          if (frame.body === "start!") {
            console.log(frame.body);
          } else {
            const quizInfo = JSON.parse(frame.body);
            setQuiz(quizInfo);
            console.log(quizInfo);
          }
        },
        {}
      );
      // 값이 null 또는 undefined인 경우 빈 문자열("")을 할당
      StompClient.send(
        `/pub/game/start/${roomId}`,
        {},
        JSON.stringify(JSON.parse(localStorage.getItem("roomInfo") ?? ""))
      );

      return () => {
        subscription.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StompClient]);

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
