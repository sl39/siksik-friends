"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import { serverAxios } from "@/services/api";
import { profileAtom } from "@/store/userAtom";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  const params = useParams();
  let userId = 0;
  if (typeof params.id === "string") {
    userId = parseInt(params.id, 10);
  }
  const [user, setUser] = useAtom(profileAtom);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverAxios(`/user/${userId}`);
        console.log(response);
        setUser(response.data);
      } catch (err) {
        console.log("프로필 정보 에러", err);
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
