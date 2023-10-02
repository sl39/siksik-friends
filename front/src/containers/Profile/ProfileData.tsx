"use client";

import { useAtom } from "jotai";
import { profileAtom } from "@/store/userAtom";
import styles from "./Profile.module.scss";

export default function ProfileData() {
  // 프로필 데이터 아톰
  const [data] = useAtom(profileAtom);

  return (
    <div className={styles.profileData}>
      <div className={styles.profileContainer}>{data.nickname}</div>
    </div>
  );
}
