"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "@/store/userAtom";
import type { User } from "@/types";
import styles from "./MyProfileCard.module.css";

export default function Profile({ data }: { data: User }) {
  const [user, setUser] = useAtom(userAtom);

  /** userAtom이 비었으면, data로 업데이트 */
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setUser(data);
      console.log(user, data);
    }
  }, [data]);

  return (
    <div className={styles.item}>
      <div className={styles.polaroid}>
        <div className={styles.img}>
          <Image
            className={styles.profileImg}
            src={`${user?.profile || "/images/character/rabbit.png"}`}
            alt="캐릭터 프로필"
            fill
            sizes="100%"
            priority
          />
        </div>
        <div className={styles.caption}>
          {user?.level} {user?.nickname}
        </div>
      </div>
    </div>
  );
}
