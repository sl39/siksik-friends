"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverAxios("/user/my-info");
        console.log(response);
        setUser(response.data);
      } catch (err) {
        console.log("유저 정보 에러", err);
      }
    };

    /** userAtom이 비었으면, data로 업데이트 */
    if (Object.keys(user).length === 0) {
      fetchData();
    }
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
