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

  // 스코어 상태 받아오기
  const roomScore = [
    { id: 1, name: "일등", score: 999 },
    { id: 2, name: "이등", score: 998 },
  ];

  return (
    <div className={styles.flex}>
      <div className={styles.top}>
        <Timer time={gameData.countTimer} resetTime={5} count={gameData.countProblem} />
      </div>
      <div className={styles.flex2}>
        <div className={styles.left}>
          <Score data={roomScore} />
        </div>
        <div className={styles.center}>
          <Question data={quiz} />
        </div>
        <div className={styles.right}>채팅</div>
      </div>
    </div>
  );
}
