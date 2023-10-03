"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import Image from "next/image";
import { userAtom } from "@/store/userAtom";
import styles from "./SimpleMyProfile.module.css";
import Modal from "@/components/gameModal";
import SimpleProfileModal from "./SimpleProfileModal";

export default function SimpleProfile() {
  const [data] = useAtom(userAtom);
  const [openProfile, setOpenProfile] = useState(true);

  return (
    <div className={styles.myProfile}>
      <div className={styles.profile}>
        <Image
          src={data?.profile || "/images/character/rabbit.png"}
          alt="프로필"
          fill
          sizes="20vw"
          style={{
            objectFit: "contain",
          }}
          priority
          quality={100}
        />
      </div>
      <div className={styles.col}>
        <div className={styles.userInfo}>
          <div className={`${styles.subBox} ${styles.level}`}>Lv.{data.level}</div>
          <div className={styles.subBox}>{data.nickname}</div>
        </div>
        <div className={styles.centerBox} />
        <div className={styles.btn}>
          <button className={styles.button} onClick={() => setOpenProfile(!openProfile)}>
            프로필
          </button>
          <Modal isOpen={openProfile}>
            <SimpleProfileModal user={data} onClose={() => setOpenProfile(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
