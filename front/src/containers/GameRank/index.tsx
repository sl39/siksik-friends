import { BsTrophy } from "react-icons/bs";
import Link from "next/link";
import styles from "./rankpage.module.scss";

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

  // 방 정보
  // const room = [];

  return (
    <div className={styles.container}>
      <div className={styles.roomInfo}>간단한 방정보</div>

      <div className={styles.leaderboard}>
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

      <div>
        <Link href="/home">메인 페이지</Link>
        <Link href="/game">게임 대기실</Link>
      </div>
    </div>
  );
}
