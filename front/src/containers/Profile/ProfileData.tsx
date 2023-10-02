"use client";

import { useAtom } from "jotai";
import { profileAtom } from "@/store/userAtom";
import styles from "./Profile.module.scss";

export default function ProfileData() {
  const [data] = useAtom(profileAtom);

  // 프로필 회원의 모든 정보 받아오기

  return (
    <div className={styles.profileData}>
      <div className={styles.profileContainer}>{data.nickname}</div>
    </div>
  );
}
