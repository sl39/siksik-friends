"use client";

import { useState } from "react";
import type { SoketUser, User } from "@/types";
import { serverAxios } from "@/services/api";
import UserItem from "./UserItem";
import styles from "../Game/game.module.scss";
import FriendsItem from "../Game/FriendsItem";

interface Props {
  data: Array<SoketUser>;
}

export default function WaitingUser({ data }: Props) {
  const [openTab, setOpenTab] = useState(1);
  const [items] = useState(data);
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
      // setCount(response.data.size);
      setNotFriends(response.data.friendList);
    } catch (err) {
      console.log("받은 요청 목록 에러", err);
    }
  };

  const handleUser = (tab: number) => {
    setOpenTab(tab);
    myFriends();
    myRequest();
  };

  return (
    <div className={styles.folder}>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${openTab === 1 ? styles.tabActive : ""}`} onClick={() => handleUser(1)}>
          <div>
            <span>게임방</span>
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
            <UserItem key={item.userId} data={item} />
          ))}
        </div>
        <div className={`${styles.page} ${styles.userBox} ${openTab === 2 ? styles.tabContentActive : ""}`}>
          {friends.map((item) => (
            <FriendsItem key={item.user_id} data={item} />
          ))}
        </div>
        <div className={`${styles.page} ${styles.userBox} ${openTab === 3 ? styles.tabContentActive : ""}`}>
          {NotFriends.map((item) => (
            <FriendsItem key={item.user_id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
