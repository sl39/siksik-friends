"use client";

import { useEffect, useState } from "react";
import type { Frame } from "stompjs";
import type { soketUser, User } from "@/types";
import { serverAxios } from "@/services/api";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import UserItem from "./UserItem";
import styles from "./game.module.scss";

export default function WaitingUser() {
  const [openTab, setOpenTab] = useState(1);
  const [items, setItems] = useState<Array<soketUser>>([]);

  /** 내 친구 조회  */
  const myFriends = async () => {
    try {
      const response = await serverAxios("/user/friend/list");
      setItems(response.data.friendList);
    } catch (err) {
      console.log("친구 목록 에러", err);
    }
  };

  /** 받은 친구 요청 조회 */
  const myRequest = async () => {
    try {
      // response / request
      const response = await serverAxios("/user/friend/response");
      // setCount(response.data.size);
      setItems(response.data.friendList);
    } catch (err) {
      console.log("받은 요청 목록 에러", err);
    }
  };

  /** Tab 클릭 시 item 정보 바꾸기 */
  const handleUser = (tab: number) => {
    if (tab === 1) {
      // 대기실 유저 보여주기
      // setItems([
      //   { user_id: 1, nickname: "wait", profile: "/images/character/rabbit.png" },
      //   { user_id: 2, nickname: "2", profile: "/images/character/rabbit.png" },
      //   { user_id: 3, nickname: "3", profile: "/images/character/rabbit.png" },
      //   { user_id: 4, nickname: "4", profile: "/images/character/rabbit.png" },
      //   { user_id: 5, nickname: "5", profile: "/images/character/rabbit.png" },
      //   { user_id: 6, nickname: "6", profile: "/images/character/rabbit.png" },
      // ]);
      setOpenTab(tab);
    } else if (tab === 2) {
      // 친구인 유저 보여주기
      myFriends();
      setOpenTab(tab);
    } else if (tab === 3) {
      // 친구 요청 보여주기
      myRequest();
      setOpenTab(tab);
    }
  };
  const user = userAtom.init;
  const stompClient = useWebSocket();

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        "/sub/lobby/list",
        function handleRoomList(frame: Frame) {
          const lobbyUserList = JSON.parse(frame.body);
          console.log(lobbyUserList);
          setItems(lobbyUserList);
        },
        {}
      );
      const soketUser = {
        userId: user.user_id,
        userName: user.nickname,
        userScore: user.score,
        userRanking: user.rank,
        ready: false,
        leader: false,
      };

      stompClient.send("/pub/lobby/entrance", {}, JSON.stringify(soketUser));
      handleUser(1);
      return () => {
        stompClient.send("/pub/lobby/exit", {}, JSON.stringify(soketUser));
        subscription.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);

  return (
    <div className={styles.folder}>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${openTab === 1 ? styles.tabActive : ""}`} onClick={() => handleUser(1)}>
          <div>
            <span>대기실</span>
          </div>
        </button>
        <button className={`${styles.tab} ${openTab === 2 ? styles.tabActive : ""}`} onClick={() => handleUser(2)}>
          <div>
            <span>친구목록</span>
          </div>
        </button>
        <button className={`${styles.tab} ${openTab === 3 ? styles.tabActive : ""}`} onClick={() => handleUser(3)}>
          <div>
            <span>친구요청</span>
          </div>
        </button>
      </div>

      <div className={`${styles.content} ${styles[`tab_${openTab}`]}`}>
        <div className={`${styles.page} ${styles.userBox}`}>
          {items.map((item) => (
            <UserItem key={item.userId} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
