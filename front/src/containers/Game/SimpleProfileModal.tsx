"use client";

import { AiOutlineClose } from "react-icons/ai";
import type { User } from "@/types";
import styles from "./modal.module.scss";
import ProfileCard from "@/components/ProfileCard";
import ProfileData from "../Profile/ProfileData";
import UpdateButton from "../Profile/UpdateButton";

interface Props {
  onClose: () => void;
  user: User;
}

export default function SimpleProfileModal({ onClose, user }: Props) {
  // const [user] = useAtom(userAtom);

  return (
    <div className={`${styles.modalContainer} ${styles.profiileModal}`}>
      <div className={styles.Card}>
        <div className={styles.profileCard}>
          <ProfileCard userProp={user} />
        </div>
        <div className={styles.btns}>
          <UpdateButton userPropId={user.user_id} />
        </div>
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
