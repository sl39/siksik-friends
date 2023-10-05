"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import { useAtom } from "jotai";
import styles from "./play.module.scss";

interface Props {
  time: number;
}

export default function Timer({ time }: Props) {
  const [sec] = useState(time * 10);

  const [movingImg] = useState([
    "/images/actor/rabbit3.png",
    "/images/actor/bulea2.png",
    "/images/actor/rabbit3.png",
    "/images/actor/dodo1.png",
  ]);

  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * movingImg.length);
    setRandomImage(movingImg[randomIndex]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const maxItem = time * 10;
  const widthProgress = (sec * 100) / maxItem;

  // transition 효과 제거하는 함수들
  // const getProgressBarClass = () => `${styles.progress} ${timerEnded ? styles.noTransition : ""} `;
  // const getImageClass = () => `${styles.image} ${timerEnded ? styles.noTransition : ""}  `;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerTime}>남은 시간: {(sec / 10).toFixed(1)} 초</div>
      <div style={{ right: `calc(${widthProgress}% - 20px)` }}>
        {/* className={getImageClass()} */}
        <Image
          src={randomImage}
          alt="moving image"
          fill
          sizes="30vw"
          className={`${styles.movingImage} z-10`}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className={styles.progressBar}>
        {/* className={getProgressBarClass()}  */}
        <div style={{ width: `calc(${widthProgress}% )`, float: "right" }} />
      </div>
    </div>
  );
}
