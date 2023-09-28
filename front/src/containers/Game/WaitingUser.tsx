"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types";
import UserItem from "./UserItem";
import styles from "./game.module.scss";

export default function WaitingUser() {
  const [openTab, setOpenTab] = useState(1);
  const [items, setItems] = useState<Array<User>>([]);

  const handleUser = (tab: number) => {
    if (tab === 1) {
      // 대기실 유저 보여주기
      setItems([
        { user_id: 1, nickname: "wait", profile: "/images/character/rabbit.png" },
        { user_id: 2, nickname: "2", profile: "/images/character/rabbit.png" },
        { user_id: 3, nickname: "3", profile: "/images/character/rabbit.png" },
        { user_id: 4, nickname: "4", profile: "/images/character/rabbit.png" },
        { user_id: 5, nickname: "5", profile: "/images/character/rabbit.png" },
        { user_id: 6, nickname: "6", profile: "/images/character/rabbit.png" },
      ]);
      setOpenTab(tab);
    } else if (tab === 2) {
      // 친구인 유저 보여주기
      setItems([
        { user_id: 1, nickname: "friend", profile: "/images/character/rabbit.png" },
        { user_id: 2, nickname: "2", profile: "/images/character/rabbit.png" },
        { user_id: 3, nickname: "3", profile: "/images/character/rabbit.png" },
        { user_id: 4, nickname: "4", profile: "/images/character/rabbit.png" },
        { user_id: 5, nickname: "5", profile: "/images/character/rabbit.png" },
        { user_id: 6, nickname: "6", profile: "/images/character/rabbit.png" },
      ]);
      setOpenTab(tab);
    } else if (tab === 3) {
      // 친구 요청 보여주기
      setItems([
        { user_id: 1, nickname: "request", profile: "/images/character/rabbit.png" },
        { user_id: 2, nickname: "2", profile: "/images/character/rabbit.png" },
        { user_id: 3, nickname: "3", profile: "/images/character/rabbit.png" },
        { user_id: 4, nickname: "4", profile: "/images/character/rabbit.png" },
        { user_id: 5, nickname: "5", profile: "/images/character/rabbit.png" },
        { user_id: 6, nickname: "6", profile: "/images/character/rabbit.png" },
      ]);
      setOpenTab(tab);
    }
  };

  useEffect(() => {
    handleUser(1);
  }, []);

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
            <UserItem key={item.user_id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
