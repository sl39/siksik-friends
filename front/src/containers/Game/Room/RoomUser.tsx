"use client";

import { useEffect, useState } from "react";
// import { serverAxios } from "@/services/api";
import type { User } from "@/types";
import UserItem from "../UserItem";
import styles from "./room.module.scss";

export default function RoomUser() {
  const [waitUser, setWaitUser] = useState<Array<User>>([]);

  /** 게임방에 있는 유저 정보를 받아오는 함수. */
  const handleRoomUser = async () => {
    console.log("room");
    setWaitUser([
      { id: 1, nickname: "room" },
      { id: 2, nickname: "2" },
      { id: 3, nickname: "3" },
      { id: 4, nickname: "4" },
      { id: 5, nickname: "5" },
      { id: 6, nickname: "6" },
    ]);
    //   try {
    //     const response = await serverAxios("");
    //     console.log(response);
    //     setWaitUser(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  /** 나의 모든 친구 정보를 받아오는 함수 */
  const handleFriends = async () => {
    console.log("friend");
    setWaitUser([
      { id: 1, nickname: "friend" },
      { id: 2, nickname: "2" },
      { id: 3, nickname: "3" },
      { id: 4, nickname: "4" },
      { id: 5, nickname: "5" },
      { id: 6, nickname: "6" },
    ]);

    //   try {
    //     const response = await serverAxios("");
    //     console.log(response);
    //     setWaitUser(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  useEffect(() => {
    handleRoomUser();
  }, []);

  return (
    <>
      <div className={styles.userBigBox}>
        <div className={styles.userBox}>
          {waitUser.map((item) => (
            <UserItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className={styles.userNav}>
        <button onClick={handleRoomUser}>대기실</button>
        <button onClick={handleFriends}>친구</button>
      </div>
    </>
  );
}