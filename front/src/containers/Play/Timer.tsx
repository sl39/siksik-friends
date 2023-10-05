"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import { useAtom } from "jotai";
import { timerEndedAtom } from "@/store/gameAtom";
import styles from "./play.module.scss";

interface Props {
  time: number;
}

export default function Timer({ time }: Props) {
  const [sec, setSec] = useState(time * 10);
  // 문제 시간 종료 여부
  const [timerEnded, setTimerEnded] = useAtom(timerEndedAtom);
  // 답 보는 시간

  const [quizNum, setQuizNum] = useState(0);

  // const [movingImg] = useState([
  //   "/images/actor/rabbit3.png",
  //   "/images/actor/bulea2.png",
  //   "/images/actor/rabbit3.png",
  //   "/images/actor/dodo1.png",
  // ]);

  useEffect(() => {
    setQuizNum((prevQuizNum) => prevQuizNum + 1);

    setSec(time * 10);
  }, [time]);

  useEffect(() => {
    // let interval: NodeJS.Timeout;
    const interval = setInterval(() => {
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
        }, 900);
      }
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, sec]);

  // const maxItem = time * 10;
  // const widthProgress = (sec * 100) / maxItem;

  // transition 효과 제거하는 함수들
  // const getProgressBarClass = () => `${styles.progress} ${timerEnded ? styles.noTransition : ""} `;
  // const getImageClass = () => `${styles.image} ${timerEnded ? styles.noTransition : ""}  `;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.quizNum}>{Number.isInteger(quizNum / 2) ? `${quizNum / 2} 번째 문제` : ""}</div>
      <div className={styles.timerTime}>남은 시간: {(sec / 10).toFixed(1)} 초</div>
      {/* <div className={getImageClass()} style={{ right: `calc(${widthProgress}% - 20px)` }}>
        <Image
          src={movingImg[quizNum % movingImg.length]}
          alt="moving image"
          fill
          sizes="10vw"
          className={`${styles.movingImage} z-10`}
          style={{ objectFit: "contain" }}
        />
      </div> */}
      {/* <div className={styles.progressBar}>
        <div className={getProgressBarClass()} style={{ width: `calc(${widthProgress}% )`, float: "right" }} />
      </div> */}
    </div>
  );
}
