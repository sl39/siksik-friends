"use client";

import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { roomAtom } from "@/store/gameAtom";
import Timer from "./Timer";
import styles from "./play.module.scss";
import Question from "./Question";
import Score from "./Score";
import Chatting from "../Room/Chatting";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { useEffect, useState } from "react";
import { Quiz } from "@/types";
import { Frame } from "stompjs";

export default function GamePlay() {
  const [gameData] = useAtom(roomAtom);
  const params = useParams();
  const roomId = Number(params.id);
  const [time, setTime] = useState<number>(3);
  // 문제 정보 받아오기
  const StompClient = useWebSocket();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

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
      StompClient.send(`/pub/game/start/${roomId}`, {}, JSON.stringify(JSON.parse(localStorage.getItem("roomInfo"))));

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [StompClient]);

  // 모든 문제가 끝나면 결과 페이지로 이동;
  // const router = useRouter();
  // router.push(`/game/rank/${roomId}`);

  return (
    <>
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
    </>
  );
}
