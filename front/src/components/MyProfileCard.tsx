"use client";

import Image from "next/image";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.image}>
        <Image src="" alt="캐릭터 프로필" />
      </div>
      <div className={styles.nickname}>
        <span className={styles.level}>레벨</span>
        닉네임
        <span className={[styles.level, styles.dummy].join(" ")} />
      </div>
    </div>
  );
}
