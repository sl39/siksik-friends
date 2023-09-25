"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { serverAxios } from "@/services/api";
import type { User } from "@/types";
import { userAtom } from "@/store/userAtom";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const [prevUser, setPrevUser] = useAtom(userAtom);
  const [user, setUser] = useState<User>(prevUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverAxios("/user/my-info");
        setPrevUser(response.data);
        setUser(response.data);
      } catch (err) {
        console.log("유저 정보 에러", err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
