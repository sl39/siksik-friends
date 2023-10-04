"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
// import { useWebSocket } from "@/socket/WebSocketProvider";
import type { SoketUser } from "@/types";
// import type { Frame } from "stompjs";
import { TotalInfoContext } from "@/socket/SubscriptionQuiz";
import Timer from "./Timer";
import styles from "./play.module.scss";
import Question from "./Question";
import Score from "./Score";
import Chatting from "../Room/Chatting";

export default function GamePlay() {
  const params = useParams();
  const roomId = Number(params.id);
  // const [time] = useState<number>(3);
  // 문제 정보 받아오기
  // eslint-disable-next-line no-null/no-null
  const { quiz, quizResult, end, roomInfoPlay } = useContext(TotalInfoContext);
  console.log(quiz, quizResult, end, roomInfoPlay);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scoreData, setScoreData] = useState<SoketUser[] | undefined>(roomInfoPlay?.members);
  const [isQuiz, setIsQuiz] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);

  useEffect(() => {
    // quiz 값이 변경될 때 실행
    if (quiz) {
      setIsQuiz(true);
      setIsResult(false);
      console.log("문제가 들어왔나?");
    } else {
      setIsQuiz(false);
    }
  }, [quiz]);

  useEffect(() => {
    // quizResult 값이 변경될 때 실행
    if (quizResult.length > 0) {
      setIsResult(true);
      setIsQuiz(false);
      console.log("결과가 들어왔나?");
    } else {
      setIsResult(false);
    }
  }, [quizResult]);

  // 모든 문제가 끝나면 결과 페이지로 이동;
  // const router = useRouter();
  // router.push(`/game/rank/${roomId}`);

  return (
    <div className={styles.flex}>
      <div className={styles.top}>
        {/* <Timer time={gameData.countTimer} resetTime={quiz ? 5 : 3} count={10} /> */}
        <Timer time={quiz ? 5 : 0} resetTime={3} count={roomInfoPlay ? roomInfoPlay.quizCount || 10 : 10} />
      </div>
      <div className={styles.flex2}>
        <div className={styles.left}>{scoreData ? <Score data={scoreData} /> : undefined}</div>
        <div className={styles.center}>
          <Question data={{ quiz, isQuiz, isResult }} />
        </div>
        <div className={styles.right}>
          {/* room이랑 같은 채팅 */}
          <Chatting roomId={roomId} />
        </div>
      </div>
    </div>
  );
}
