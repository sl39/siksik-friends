"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import WebSocketProvider, { useWebSocket } from "@/socket/WebSocketProvider";
import type { Frame } from "stompjs";
import type { Room, soketUser } from "@/types";
import StartBtn from "./StartBtn";
import styles from "./room.module.scss";
import RoomInfo from "./RoomInfo";
import Chatting from "./Chatting";
import WaitingUser from "./WaitingUser";

export default function Index() {
  const params = useParams();
  const roomId = Number(params.id);

  const [room, setRoom] = useState<Room | undefined>(undefined);

  const [soketUser, setSoketUser] = useState<soketUser>({
    userId: 0,
    userName: "user.nickname",
    userScore: 1111,
    userRanking: 111,
    ready: false,
    leader: true,
  });
  const stompClient = useWebSocket();
  const [userInfo, setUserInfo] = useState<soketUser[]>([]);
  const [leaderReady, setleaderReady] = useState(0);

  // {
  //   !soketUser.leader ? (!soketUser.ready ? setReady(4) : setReady(3)) : start === 1 ? setReady(1) : setReady(2);
  // }

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/sub/room/info/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const roomInfo = JSON.parse(frame.body);
          setRoom(roomInfo);
          setUserInfo(roomInfo.members);
          setleaderReady(roomInfo.roomCurrent - roomInfo.roomReady);
          localStorage.setItem("roomInfo", JSON.stringify(roomInfo));
          roomInfo.members.forEach((element: soketUser) => {
            if (element.userId === soketUser.userId) {
              setSoketUser(element);
            }
          });
        },
        {}
      );

      stompClient.send(`/pub/room/entrance/${roomId}`, {}, JSON.stringify(soketUser));
      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 리스너  제거

        stompClient.send(`/pub/room/exit/${roomId}`, {}, JSON.stringify(soketUser));
        subscription.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);

  return (
    <>
      <div className={styles.left}>
        <div className={styles.roomInfo}>{room ? <RoomInfo room={room} /> : null}</div>
        <div className={styles.chatting}>
          <Chatting roomId={roomId} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.roomUser}>
          <WaitingUser data={userInfo} />
        </div>
        {stompClient && (
          <div className={styles.startBtn}>
            <StartBtn gameId={roomId} soketUser={soketUser} leaderReady={leaderReady} stompClient={stompClient} />
          </div>
        )}
      </div>
    </>
  );
}
