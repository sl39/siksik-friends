"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import type { SoketUser } from "@/types";
import { TotalInfoContext } from "@/socket/SubscriptionQuiz";
import Timer from "./Timer";
import styles from "./play.module.scss";
import Question from "./Question";
import Score from "./Score";
import Chatting from "../Room/Chatting";

export default function GamePlay() {
  const router = useRouter();

  const params = useParams();
  const roomId = Number(params.id);

  // 문제 정보 받아오기
  // const { quiz, quizResult, end, roomInfoPlay } = useContext(TotalInfoContext);
  const { quiz, quizResult, end } = useContext(TotalInfoContext);
  // console.log(quiz, quizResult, end, roomInfoPlay);
  const [scoreData, setScoreData] = useState<SoketUser[] | undefined>(quizResult);
  const [isQuiz, setIsQuiz] = useState(false);
  const [isResult, setIsResult] = useState(false);

  /** quiz 값이 변경되면, 데이터 전달 */
  useEffect(() => {
    if (quiz) {
      setIsQuiz(true);
      setIsResult(false);
    } else {
      setIsQuiz(false);
    }
  }, [quiz]);

  useEffect(() => {
    // quizResult 값이 변경될 때 실행
    if (quizResult.length > 0) {
      setIsResult(true);
      setIsQuiz(false);
      setScoreData(quizResult);
    } else {
      setIsResult(false);
    }
  }, [quizResult]);

  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    if (end) {
      // 모든 문제가 끝나면 결과 페이지로 이동;
      setIsDone(true);
      setTimeout(() => {
        router.replace(`/game/start/rank/${roomId}`);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  return (
    <>
      <div className={`${styles.flex} z-15`}>
        <div className={styles.top}>
          {/* <Timer time={gameData.countTimer} resetTime={quiz ? 5 : 3} count={10} /> */}
          <Timer time={isQuiz ? 5 : 3} />
        </div>
        <div className={styles.flex2}>
          <div className={styles.left}>{scoreData ? <Score data={scoreData} /> : undefined}</div>
          <div className={styles.center}>
            <Question data={{ quiz, isQuiz, isResult }} isDone={isDone} />
          </div>
          <div className={styles.right}>
            {/* room이랑 같은 채팅 */}
            <Chatting roomId={roomId} />
          </div>
        </div>
      </div>
      <div className={`${styles.image1} z-11`}>
        <Image src="/images/actor/queen.png" alt="이미지" sizes="30vw" fill priority style={{ objectFit: "contain" }} />
      </div>
    </>
  );
}
