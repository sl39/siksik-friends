"use client";

import { useEffect, useState } from "react";
import type { SoketUser } from "@/types";
import styles from "../Game/game.module.scss";

interface Props {
  data: SoketUser;
}

export default function UserItem({ data }: Props) {
  const [user, setUser] = useState<SoketUser>(data);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
