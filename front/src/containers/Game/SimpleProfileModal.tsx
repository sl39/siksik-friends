"use client";

import { AiOutlineClose } from "react-icons/ai";
import type { User } from "@/types";
import styles from "./modal.module.scss";
import ProfileCard from "@/components/ProfileCard";
import ProfileData from "../Profile/ProfileData";

interface Props {
  onClose: () => void;
  user: User;
}

export default function SimpleProfileModal({ onClose, user }: Props) {
  // const [user] = useAtom(userAtom);

  return (
    <div className={`${styles.modalContainer} ${styles.profiileModal}`}>
      <div className={styles.Card}>
        <ProfileCard userProp={user} />
        <div className={styles.btns}>친구요청</div>
      </div>
      <div className={styles.data}>
        <ProfileData userId={user.user_id} />
      </div>

      <button className={styles.close} onClick={onClose}>
        <AiOutlineClose size={48} />
      </button>
    </div>
  );
}
