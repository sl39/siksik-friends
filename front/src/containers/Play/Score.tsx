import { BsTrophy } from "react-icons/bs";
import type { GamePlay, SoketUser } from "@/types";
import { useEffect, useState } from "react";
import styles from "./play.module.scss";

interface Props {
  data?: SoketUser[];
}

export default function Score({ data }: Props) {
  const [scoreData, setScoreData] = useState<SoketUser[]>([]);
  useEffect(() => {
    if (data) {
      setScoreData(data);
    }
  }, [data]);
  // 더미 스코어 상태
  // setScoreData([
  //   {
  //     userId: 11,
  //     userName: "z상식지존z",
  //     gameScore: 600,
  //     userScore: 9999,
  //     userRanking: 1,
  //     leader: true,
  //     ready: false,
  //   },
  //   {
  //     userId: 12,
  //     userName: "z상식지존z11",
  //     gameScore: 300,
  //     userScore: 789,
  //     userRanking: 103,
  //     leader: false,
  //     ready: false,
  //   },
  // ]);
  return (
    <div className={styles.leaderboard}>
      <h1>
        <span className={styles.icon}>
          <BsTrophy size={24} />
        </span>
        현재 순위
      </h1>

      {scoreData ? (
        <ol>
          {scoreData.map((item: any) => (
            <li key={item.userName}>
              <mark>{item.userName}</mark>
              <small>{item.gameScore}</small>
            </li>
          ))}
        </ol>
      ) : undefined}
    </div>
  );
}
