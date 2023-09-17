"use client";

import { useRouter } from "next/navigation";
import styles from "./home.module.css";

export default function StartBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/game/wait");
  };

  return (
    <button onClick={handleClick}>
      <span className={[styles.postIt, styles.buttonFont].join(" ")}>게임 시작!</span>
    </button>
  );
}
