"use client";

import { useRouter } from "next/navigation";
import styles from "./home.module.scss";

export default function StartBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/game");
  };

  return (
    <button onClick={handleClick} className={styles["button-wrapper"]}>
      <span className={`${styles.span} ${styles["background-button"]}`} title="게임 시작!" />
    </button>
  );
}
