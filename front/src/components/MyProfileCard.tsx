"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const [user] = useAtom(userAtom);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.image}>
        <Image src={`${user?.profile}`} alt="캐릭터 프로필" width={300} height={320} />
      </div>
      <div className={styles.nickname}>
        <span className={styles.level}>{user?.level}</span>
        {user?.nickname}
        <span className={[styles.level, styles.dummy].join(" ")} />
      </div>
    </div>
  );
}
