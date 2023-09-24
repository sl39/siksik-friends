"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import styles from "./Rank.module.css";

export default function MyRank() {
  const user = useAtom(userAtom)[0];

  return (
    <>
      <div className={styles.rankContainer} />
      <Image className={styles.myRank} src="/images/rankstamp.png" alt="나의 도장" fill sizes="120%" priority />
      <div className={styles.rankNum}>{user?.rank ? `${user.rank} 등` : "등수 정보 없음"}</div>
    </>
  );
}
