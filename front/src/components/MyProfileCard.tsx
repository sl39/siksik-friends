"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const [user] = useAtom(userAtom);

  return (
    <div className={[styles.item].join(" ")}>
      <div className={styles.polaroid}>
        <Image className={styles.img} src={`${user?.profile}`} alt="캐릭터 프로필" width={300} height={320} />
        <div className={styles.caption}>
          {user?.level} {user?.nickname}
        </div>
      </div>
    </div>
  );
}
