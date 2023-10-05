"use client";

import { BsTrophy } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAtom } from "jotai";
import type { SoketUser } from "@/types";
import { TotalInfoContext } from "@/socket/SubscriptionQuiz";
import { userAtom } from "@/store/userAtom";
import styles from "./rankpage.module.scss";
import MyData from "./MyData";

export default function GameRank() {
  const [user] = useAtom(userAtom);
  const data: Array<SoketUser> = [];
  const { quizResult, roomInfoPlay } = useContext(TotalInfoContext);
  const [scoreData, setScoreData] = useState<SoketUser[] | undefined>(quizResult);
  const [myInfo, setMyInfo] = useState<SoketUser | undefined>(undefined);
  useEffect(() => {
    if (quizResult) {
      setScoreData(quizResult);
      quizResult.forEach((userInfo) => {
        if (userInfo.userId === user.user_id) {
          setMyInfo(userInfo);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizResult]);
  // 이 게임에 대한 내 점수 정보

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        {data && (
          <div className={`${styles.leaderboard} ${styles.left}`}>
            <h1>
              <span className={styles.icon}>
                <BsTrophy size={24} />
              </span>
              전체 순위
            </h1>
            <ol>
              {scoreData?.map((item) => (
                <li key={item.userName!}>
                  <mark>{item.userName!}</mark>
                  <small>{item.gameScore!}</small>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className={`${styles.myBoard} ${styles.right}`}>
          {myInfo && roomInfoPlay && <MyData myInfo={myInfo} roomInfoPlay={roomInfoPlay} scoreData={scoreData} />}
        </div>
      </div>

      <div className={styles.btns}>
        <button onClick={() => router.replace("/home")} className={styles.btn}>
          메인 페이지
        </button>
        <button onClick={() => router.replace("/game")} className={styles.btn}>
          게임 대기실
        </button>
      </div>
    </div>
  );
}
