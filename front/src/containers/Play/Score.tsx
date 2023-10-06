import { BsTrophy } from "react-icons/bs";
import { useEffect, useState } from "react";
import type { SoketUser } from "@/types";
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
