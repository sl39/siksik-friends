"use client";

import { BsTrophy } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import type { Room, SoketUser } from "@/types";
import { TotalInfoContext } from "@/socket/SubscriptionQuiz";
import { userAtom } from "@/store/userAtom";
import { useWebSocket } from "@/socket/WebSocketProvider";
import type { Frame } from "stompjs";
import styles from "./rankpage.module.scss";
import MyData from "./MyData";

export default function GameRank() {
  const [user] = useAtom(userAtom);
  const data: Array<SoketUser> = [];
  const { quizResult, roomInfoPlay } = useContext(TotalInfoContext);
  const [scoreData, setScoreData] = useState<SoketUser[] | undefined>(quizResult);
  const [myInfo, setMyInfo] = useState<SoketUser | undefined>(undefined);
  const stompClient = useWebSocket();
  const params = useParams();
  const roomId = Number(params.id);

  const [room, setRoom] = useState<Room | undefined>(roomInfoPlay);

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
  useEffect(() => {
    if (stompClient) {
      const subscription3 = stompClient.subscribe(
        `/sub/room/info/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const gameEnd = JSON.parse(frame.body);
          console.log(gameEnd);
          setRoom(gameEnd || roomInfoPlay);
        },
        {}
      );
      stompClient.send(`/pub/room/entrance/${roomId}`, {}, JSON.stringify(myInfo));
      return () => {
        subscription3.unsubscribe();
      };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient, myInfo]);

  const router = useRouter();

  return (
    <>
      <div className={`${styles.container} z-15`}>
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
            {myInfo && room && <MyData myInfo={myInfo} room={room} scoreData={scoreData} />}
          </div>
        </div>

        <div className={styles.btns}>
          <button onClick={() => router.replace("/home")} className={styles.btn}>
            메인 페이지로 이동
          </button>
          <button onClick={() => router.replace("/game")} className={styles.btn}>
            게임 로비로 이동
          </button>
        </div>
      </div>
      <div className={`${styles.backImg1} z-10`}>
        <Image
          src="/images/actor/rabbit1.png"
          alt="배경이미지"
          sizes="30vw"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className={`${styles.backImg2} z-10`}>
        <Image
          src="/images/actor/alice2.png"
          alt="배경이미지"
          sizes="30vw"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </>
  );
}
