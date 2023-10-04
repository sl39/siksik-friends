"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import type { Frame } from "stompjs";
import type { SoketUser, User } from "@/types";
import { serverAxios } from "@/services/api";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import UserItem from "./UserItem";
import styles from "./game.module.scss";
import FriendsItem from "./FriendsItem";

export default function WaitingUser() {
  const [openTab, setOpenTab] = useState(1);
  const [items, setItems] = useState<Array<SoketUser>>([]);

  const [friends, setFriends] = useState<Array<User>>([]);
  const [NotFriends, setNotFriends] = useState<Array<User>>([]);

  /** 내 친구 조회 */
  const myFriends = async () => {
    try {
      const response = await serverAxios("/user/friend/list");
      setFriends(response.data.friendList);
    } catch (err) {
      console.log("친구 목록 에러", err);
    }
  };

  /** 받은 친구 요청 조회 */
  const myRequest = async () => {
    try {
      // response / request
      const response = await serverAxios("/user/friend/response");
      const request = await serverAxios("/user/friend/request");

      // 병합된 리스트 생성
      const combinedList = [...response.data.friendList, ...request.data.friendsList];

      // setCount(response.data.size);
      setNotFriends(combinedList);
    } catch (err) {
      console.log("받은 요청 목록 에러", err);
    }
  };

  const handleUser = (tab: number) => {
    setOpenTab(tab);
    myFriends();
    myRequest();
  };

  // const user = userAtom.init;
  const stompClient = useWebSocket();

  const [user] = useAtom(userAtom);
  /** User -> SoketUser */
  function convertUserToSoketUser(inputUser: User): SoketUser {
    return {
      userId: inputUser.user_id ?? 0, // user_id가 없는 경우 기본값으로 0 사용
      userName: inputUser.nickname,
      userScore: inputUser.score,
      userRanking: inputUser.rank,
      level: inputUser.level,
      ready: false,
      leader: false,
    };
  }

  // eslint-disable-next-line consistent-return
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
        userId: 121211,
        userName: "user.ㅎㅇ",
        userScore: 1111,
        userRanking: 111,
        ready: false,
        leader: false,
      };
      // const soketUser = convertUserToSoketUser(user);

      stompClient.send("/pub/lobby/entrance", {}, JSON.stringify(soketUser));
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
        <div className={`${styles.page} ${styles.userBox} ${openTab === 1 ? styles.tabContentActive : ""}`}>
          {items.map((item) => (
            <UserItem key={item.userId} dataProp={item} />
          ))}
        </div>
        <div className={`${styles.page} ${styles.userBox} ${openTab === 2 ? styles.tabContentActive : ""}`}>
          {friends.map((item) => (
            <UserItem key={item.user_id} dataProp={item} />
          ))}
        </div>
        <div className={`${styles.page} ${styles.userBox} ${openTab === 3 ? styles.tabContentActive : ""}`}>
          {NotFriends.map((item) => (
            <UserItem key={item.user_id} dataProp={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
