"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { resetTimerAtom, timerEndedAtom } from "@/store/gameAtom";
import styles from "./play.module.scss";

interface Props {
  time: number;
  resetTime: number;
  count: number;
}

export default function Timer({ time, resetTime, count }: Props) {
  const [sec, setSec] = useState(time * 10);
  // 문제 시간 종료 여부
  const [timerEnded, setTimerEnded] = useAtom(timerEndedAtom);
  // 답 보는 시간
  const [resetTimer, setResetTimer] = useAtom(resetTimerAtom);

  const [quizNum, setQuizNum] = useState(0);

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

    setQuizNum((prevQuizNum) => prevQuizNum + 1);

    if (!resetTimer) {
      setSec(time * 10);
    } else {
      setSec(resetTime * 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, resetTime, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (quizNum < count * 2) {
      interval = setInterval(() => {
        setTimerEnded(false);
        if (sec > 0) {
          setSec((prevSec) => prevSec - 1);
        }
        // 시간 종료
        else {
          clearInterval(interval);
          // 스위칭
          setTimeout(() => {
            setTimerEnded(!timerEnded);
            setResetTimer(!resetTimer);
          }, 900);
        }
      }, 100);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, sec]);

  const maxItem = (!resetTimer ? time : resetTime) * 10;
  const widthProgress = (sec * 100) / maxItem;

  // transition 효과 제거하는 함수들
  const getProgressBarClass = () => `${styles.progress} ${timerEnded ? styles.noTransition : ""} `;
  const getImageClass = () => `${styles.image} ${timerEnded ? styles.noTransition : ""}  `;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerTime}>남은 시간: {(sec / 10).toFixed(1)} 초</div>
      <div className={getImageClass()} style={{ right: `calc(${widthProgress}% - 20px)` }}>
        <Image
          src={randomImage}
          alt="moving image"
          fill
          sizes="10vw"
          className={`${styles.movingImage} z-10`}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className={styles.progressBar}>
        <div className={getProgressBarClass()} style={{ width: `calc(${widthProgress}% )`, float: "right" }} />
      </div>
    </div>
  );
}
