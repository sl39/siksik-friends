"use client";

import styles from "./home.module.css";
import { useRouter } from "next/navigation";

export default function StartBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/game/wait");
  };

  return (
    <div className={styles.start}>
      <button onClick={handleClick}>게임 시작!</button>
    </div>
  );
}
