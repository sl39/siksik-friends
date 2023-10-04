"use client";

import { BsTrophy } from "react-icons/bs";
import { useRouter } from "next/navigation";
import styles from "./rankpage.module.scss";
import MyData from "./MyData";

export default function GameRank() {
  // 전체 순위 정보
  const data = [
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
    { name: "11등", score: 11 },
  ];

  // 내 점수 정보
  const myData = [];

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={`${styles.leaderboard} ${styles.left}`}>
          <h1>
            <span className={styles.icon}>
              <BsTrophy size={24} />
            </span>
            전체 순위
          </h1>
          <ol>
            {data.map((item) => (
              <li key={item.name}>
                <mark>{item.name}</mark>
                <small>{item.score}</small>
              </li>
            ))}
          </ol>
        </div>
        <div className={`${styles.myBoard} ${styles.right}`}>
          <MyData data={myData} />
        </div>
      </div>

      <div className={styles.btns}>
        <button onClick={() => router.push("/home")} className={styles.btn}>
          메인 페이지
        </button>
        <button onClick={() => router.push("/game")} className={styles.btn}>
          게임 대기실
        </button>
      </div>
    </div>
  );
}
