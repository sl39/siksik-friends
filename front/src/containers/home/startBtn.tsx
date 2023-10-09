"use client";

import { useRouter } from "next/navigation";
import styles from "./home.module.scss";

export default function StartBtn() {
  const router = useRouter();

  /** 게임 소켓 입장 후 화면 전환 */
  const handleClick = () => {
    // 게임 소켓에 입장하는 로직
    router.push("/game");
  };

  return (
    <button onClick={handleClick} className={styles["button-wrapper"]}>
      <span className={`${styles.span} ${styles["background-button"]}`} title="게임 시작!" />
    </button>
  );
}
