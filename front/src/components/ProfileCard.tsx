"use client";

import Image from "next/image";
import type { User } from "@/types";
import styles from "./MyProfileCard.module.css";

interface Props {
  userProp: User;
}

export default function Profile({ userProp }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.polaroid}>
        <div className={styles.img}>
          <Image
            className={styles.profileImg}
            src={`${userProp?.profile || "/images/character/rabbit.png"}`}
            alt="캐릭터 프로필"
            fill
            sizes="100%"
            priority
          />
        </div>
        <div className={styles.caption}>{userProp?.nickname}</div>
      </div>
    </div>
  );
}
