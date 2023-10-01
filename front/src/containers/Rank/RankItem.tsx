"use client";

import { useRouter } from "next/navigation";
// import Image from "next/image";
import type { Rank } from "@/types";
import styles from "./Rank.module.css";

interface Props {
  item: Rank;
}

export default function RankItem({ item }: Props) {
  const router = useRouter();

  const onClick = (nickname: string, user_id: number) => {
    router.replace(`/home/profile/${nickname}/${user_id}`);
  };

  return (
    <div className={styles.RankItem}>
      <span
        className={`${item.rank === 1 ? styles.first : ""} ${item.rank === 2 ? styles.second : ""} ${
          item.rank === 3 ? styles.third : ""
        } ${styles.itemNum}`}
      >
        {item.rank}위
      </span>
      {/* <div style={{ position: "relative", height: "40px", width: "auto", aspectRatio: "3 / 4" }}>
        <Image
          src="/images/thrumpCards/red_joker.png"
          alt="levelCard"
          sizes="10vw"
          fill
          style={{ objectFit: "contain" }}
        />
      </div> */}
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
