"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import type { User } from "@/types";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const [userState] = useAtom(userAtom);

  // eslint-disable-next-line no-null/no-null
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    /** 유저 정보 가져오기 */
    const fetchUserData = async () => {
      try {
        const response = await serverAxios("/user");
        console.log("유저 정보", response);
        setUser(response.data);
      } catch (err) {
        console.log("유저 정보 에러", err);
        setUser(userState);
      }
    };
    fetchUserData();
  }, [userState]);

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
