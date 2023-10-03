"use client";

// import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
// import { roomAtom } from "@/store/gameAtom";
import WebSocketProvider, { useWebSocket } from "@/socket/WebSocketProvider";
import StartBtn from "./StartBtn";
import styles from "./room.module.scss";
import RoomInfo from "./RoomInfo";
import Chatting from "./Chatting";
import { useEffect, useState } from "react";
import { Frame } from "stompjs";
import { Room, soketUser } from "@/types";
import UserItem from "./UserItem";

export default function Index() {
  // 방 정보
  // const room = useAtom(roomAtom)[0];

  let pathname = usePathname();
  pathname = pathname.replace("/game/room/", "");
  const [room, setRoom] = useState<Room | undefined>(undefined);

  const [soketUser, setSoketUser] = useState({
    userId: 1211,
    userName: "user.nickname",
    userScore: 1111,
    userRanking: 111,
    ready: false,
    leader: false,
  });
  const roomId = Number(pathname);
  // const gameId = 1;
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
          console.log("여기는 들어오나");
          const roomInfo = JSON.parse(frame.body);
          console.log(roomInfo);
          setRoom(roomInfo);
          setUserInfo(roomInfo.members);
          setleaderReady(roomInfo.roomCurrent - roomInfo.roomReady);
          roomInfo.members.forEach((element: soketUser) => {
            if (element.userId === soketUser.userId) {
              console.log(element, "여기가 그 룸 받아올때");
              setSoketUser(soketUser);
              return;
            }
          });
        },

        {}
      );

      stompClient.send(`/pub/room/entrance/${roomId}`, {}, JSON.stringify(soketUser));
      console.log("if 문은 통과");
      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거

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
          <div className={`${styles.page} ${styles.userBox}`}>
            {userInfo.map((item) => (
              <UserItem key={item.userId} data={item} />
            ))}
          </div>
        </div>
        <div className={styles.startBtn}>
          <StartBtn gameId={roomId} soketUser={soketUser} leaderReady={leaderReady} stompClient={stompClient} />
        </div>
      </div>
    </>
  );
}
