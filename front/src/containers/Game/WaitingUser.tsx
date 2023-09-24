"use client";

import { useEffect, useState } from "react";
// import { serverAxios } from "@/services/api";
import type { User } from "@/types";
import UserItem from "./UserItem";
import styles from "./game.module.scss";

export default function WaitingUser() {
  const [waitUser, setWaitUser] = useState<Array<User>>([]);
  const [openTab, setOpenTab] = useState(0);

  /** 대기실에 있는 유저 정보를 받아오는 함수. */
  const handleWaitUser = async () => {
    setOpenTab(0);

    await setWaitUser([
      { user_id: 1, nickname: "wait" },
      { user_id: 2, nickname: "2" },
      { user_id: 3, nickname: "3" },
      { user_id: 4, nickname: "4" },
      { user_id: 5, nickname: "5" },
      { user_id: 6, nickname: "6" },
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
    setOpenTab(1);

    await setWaitUser([
      { user_id: 1, nickname: "friend" },
      { user_id: 2, nickname: "2" },
      { user_id: 3, nickname: "3" },
      { user_id: 4, nickname: "4" },
      { user_id: 5, nickname: "5" },
      { user_id: 6, nickname: "6" },
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
    handleWaitUser();
  }, []);

  return (
    <>
      <div className={styles.userBigBox}>
        <div className={styles.userBox}>
          {waitUser.map((item) => (
            <UserItem key={item.user_id} data={item} />
          ))}
        </div>
      </div>
      <div className={`${styles.userNav} ${styles.tabs}`}>
        <button className={`${styles.tab} ${openTab === 0 ? styles.tabOpen : ""}`} onClick={handleWaitUser}>
          <div>대기실</div>
        </button>
        <button className={`${styles.tab} ${openTab === 1 ? styles.tabOpen : ""}`} onClick={handleFriends}>
          <div>친구</div>
        </button>
      </div>
    </>
  );
}
