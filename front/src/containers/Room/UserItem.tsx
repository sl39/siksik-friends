"use client";

import type { soketUser } from "@/types";
import styles from "../Game/game.module.scss";

interface Props {
  data: soketUser;
}

export default function UserItem({ data }: Props) {
  console.log(data.ready);
  return (
    <div className={styles.userItem}>
      {/* <Image
        className={styles.profile}
        src={data?.profile || "/images/character/rabbit.png"}
        alt="프로필"
        fill
        sizes="50%"
        priority
        quality={100}
      /> */}
      <div className={`${styles.subBox} ${styles.level}`}>{data.userRanking}</div>
      <div className={styles.subBox}>{data.userName}</div>
      <div className={`${styles.subBox} ${styles.ready}`}>
        {data.ready ? "ready" : "wait"}
        {data.leader ? " - 방장" : ""}
      </div>
    </div>
  );
}
