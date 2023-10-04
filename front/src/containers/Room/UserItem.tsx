"use client";

import type { soketUser } from "@/types";
import styles from "../Game/game.module.scss";
import { useEffect, useState } from "react";

interface Props {
  data: soketUser;
}

export default function UserItem({ data }: Props) {
  const [user, setUser] = useState<soketUser>(data);

  useEffect(() => {
    setUser(data);
  });
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
      <div className={`${styles.subBox} ${styles.level}`}>{user.userRanking}</div>
      <div className={styles.subBox}>{user.userName}</div>
      <div className={`${styles.subBox} ${styles.ready}`}>
        {user.ready ? "ready" : "wait"}
        {user.leader ? " - 방장" : ""}
      </div>
    </div>
  );
}
