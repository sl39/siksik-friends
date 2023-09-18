"use client";

import { useRouter } from "next/navigation";
import styles from "./Profile.module.css";

export default function UpdateButton() {
  const router = useRouter();

  const onClick = () => {
    router.push(`/home/profile/update`);
  };
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.buttonText}>정보 수정</span>
    </button>
  );
}
