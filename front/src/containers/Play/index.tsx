"use client";

import { useAtom } from "jotai";
import { roomAtom } from "@/store/gameAtom";
import Timer from "./Timer";
import styles from "./play.module.scss";
import Question from "./Question";
import Score from "./Score";

export default function GamePlay() {
  const [gameData] = useAtom(roomAtom);

  // 문제 정보 받아오기
  const quiz = {
    type: "경제",
    title: "문제 제목",
    description: "문제 주절주절",
    answer: "이건 정답",
  };

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

  return (
    <div className={styles.flex}>
      <div className={styles.top}>
        <Timer time={gameData.countTimer} resetTime={5} count={gameData.countProblem} />
      </div>
      <div className={styles.flex2}>
        <div className={styles.left}>
          <Score data={scoreData} />
        </div>
        <div className={styles.center}>
          <Question data={quiz} />
        </div>
        <div className={styles.right}>채팅</div>
      </div>
    </div>
  );
}
