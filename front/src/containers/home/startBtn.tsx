"use client";

import { useEffect, useRef, MouseEvent } from "react";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";

export default function StartBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/game/wait");
  };

  return (
    <div onClick={handleClick} className={[styles.postIt].join(" ")}>
      <button onClick={handleClick}>
        <span>게임 시작!</span>
      </button>
    </div>
  );
}
