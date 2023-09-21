"use client";

import { useRouter } from "next/navigation";
import styles from "./Profile.module.css";
import { serverAxios } from "@/services/api";

export default function UpdateButton() {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/home/profile/update`);
  };
  const handleLogout = async () => {
    try {
      await serverAxios("/user/log-out");
      router.push("/");
    } catch (err) {
      console.log("로그아웃 에러", err);
    }
  };
  return (
    <>
      <button onClick={handleUpdate} className={styles.button}>
        <span className={styles.buttonText}>정보 수정</span>
      </button>
      <button onClick={handleLogout} className={styles.button}>
        <span className={styles.buttonText}>로그아웃</span>
      </button>
    </>
  );
}
