"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const [user] = useAtom(userAtom);

  return (
    <div className={styles.item}>
      <div className={styles.polaroid}>
        <div className={styles.img}>
          <Image className={styles.profileImg} src={`${user?.profile}`} alt="캐릭터 프로필" layout="fill" priority />
        </div>
        <div className={styles.caption}>
          {user?.level} {user?.nickname}
        </div>
      </div>
    </div>
  );
}
