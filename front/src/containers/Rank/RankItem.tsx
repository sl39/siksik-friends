"use client";

import { useRouter } from "next/navigation";
import type { Rank } from "@/types";
import styles from "./Rank.module.css";

interface Props {
  item: Rank;
}

export default function RankItem({ item }: Props) {
  const router = useRouter();

  const onClick = (user_nickname: string, user_id: number) => {
    router.push(`profile/${user_nickname}/${user_id}`);
  };
  return (
    <div className={styles.RankItem}>
      <span className={styles.itemNum}>{item.rank}위</span>
      <span className={styles.rankLevel}>Lv. {item.level}</span>
      <span className={`${styles.rankName}`}>
        <button onClick={() => onClick(item?.nickname, item?.user_id)} className={styles.highlight}>
          {item.nickname}
        </button>
      </span>
      <span className={styles.score}>{item.score} 점</span>
    </div>
  );
}
