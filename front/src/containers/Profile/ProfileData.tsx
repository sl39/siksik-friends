"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import { profileAtom } from "@/store/userAtom";
import styles from "./Profile.module.scss";

export default function ProfileData() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };
  // 프로필 회원의 모든 정보 받아오기
  const [data] = useAtom(profileAtom);

  return (
    <div className={styles.profileData}>
      <section id="wrapper" className={styles.profileContainer}>
        <div className={styles.content}>
          {/* tab */}
          <div className={styles.tabs}>
            <button
              onClick={() => handleTabClick(1)}
              className={`${styles.tablinks} ${activeTab === 1 ? styles.active : ""}`}
            >
              <p>정보</p>
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={`${styles.tablinks} ${activeTab === 2 ? styles.active : ""}`}
            >
              <p>데이터</p>
            </button>
          </div>

          <div className={`${styles.wrapper_tabcontent}`}>
            <div className={`${styles.tabcontent} ${activeTab === 1 ? styles.active : ""}`}>
              <h3>정보</h3>
              <p>
                <div>닉네임</div>
                <div>레벨</div>
                <div>랭킹</div>
                <div>뱃지(업적)</div>
              </p>
            </div>

            <div className={`${styles.tabcontent} ${activeTab === 2 ? styles.active : ""}`}>
              <h3>데이터</h3>
              <p>
                <div>통계</div>
                <div>전적</div>
                <div>게임 관련 데이터</div>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
