"use client";

import { useAtom } from "jotai";
import UserItem from "@/containers/Game/UserItem";
import { userAtom } from "@/store/userAtom";
import styles from "./SimpleMyProfile.module.css";

export default function SimpleProfile() {
  const [myData] = useAtom(userAtom);

  return (
    <>
      <div className={styles.myProfile}>
        <UserItem data={myData} />
      </div>
      <div className={styles.myBtn}>
        <button className={styles.button}>프로필</button>
        <button className={styles.button}>친구</button>
        <button className={styles.button}>친구요청</button>
      </div>
    </>
  );
}
