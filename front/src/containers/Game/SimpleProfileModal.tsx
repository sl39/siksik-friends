"use client";

import { AiOutlineClose } from "react-icons/ai";
import type { User } from "@/types";
import styles from "./modal.module.scss";
import ProfileCard from "@/components/ProfileCard";

interface Props {
  onClose: () => void;
  user: User;
}

export default function SimpleProfileModal({ onClose, user }: Props) {
  // const [user] = useAtom(userAtom);

  // 회원의 모든 정보 받아오기

  return (
    <div className={`${styles.modalContainer} ${styles.profiileModal}`}>
      <div className={styles.Card}>
        <ProfileCard userProp={user} />
      </div>
      <div className={styles.data}>
        또정보
        <div className={styles.btns}>친구요청</div>
      </div>

      <button className={styles.close} onClick={onClose}>
        <AiOutlineClose size={48} />
      </button>
    </div>
  );
}
