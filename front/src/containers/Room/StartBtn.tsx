"use client";

import { useRouter } from "next/navigation";
import styles from "./room.module.scss";

interface Props {
  gameId: number;
}

export default function StartBtn({ gameId }: Props) {
  const router = useRouter();

  /** 게임으로 연결하는 함수 */
  const handleStart = () => {
    router.push(`/game/play/${gameId}`);
  };

  return (
    <button onClick={handleStart} className={styles["button-wrapper"]}>
      <span className={`${styles.span} ${styles["background-button"]}`} title="게임 시작!" />
    </button>
  );
}
