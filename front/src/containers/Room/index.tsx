"use client";

// import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
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

import WaitingUser from "./WaitingUser";

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
  // const params = useParams();
  // const roomId = Number(params.id);

  // const router = useRouter();
  // // 내가 시작을 한지 여부
  // const [btnActive, setBtnActive] = useState(false);

  // const ImBoss = false;
  // let data = "";
  // /** 게임으로 연결하는 함수 */
  // if (ImBoss) {
  //   data = "게임 시작!";
  // } else {
  //   data = "Ready!";
  // }
  // const handleStart = () => {
  //   // 내가 방장이고, 모두가 준비 되었으면 "게임 시작!", 모두 게임으로 입장 어케함?
  //   if (ImBoss) {
  //     // 모두가 준비 되었는 지 확인
  //     router.push(`/game/play/${roomId}`);
  //   } else {
  //     // 방장이 아니면, Ready <-> 해제 번갈아서
  //     setBtnActive(!btnActive);
  //   }
  // };

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
        {/* <div className={styles.startBtn}>
          <StartBtn gameId={roomId} soketUser={soketUser} leaderReady={leaderReady} stompClient={stompClient} />
          <WaitingUser />
        </div>
        <div className={styles.startBtn}>
          <button onClick={handleStart} className={`${styles["button-wrapper"]}`}>
            <span
              className={`${styles.span} ${styles["background-button"]} ${btnActive ? styles.BtnActive : ""}`}
              title={data}
            />
          </button>
        </div> */}
      </div>
    </>
  );
}
