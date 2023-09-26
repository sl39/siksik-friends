"use client";

// import { useAtom } from "jotai";
import { useAtom } from "jotai";
// import { userAtom } from "@/store/userAtom";
import { userAtom } from "@/store/userAtom";
import styles from "./modal.module.scss";

interface Props {
  onClose: () => void;
}

export default function SimpleProfileModal({ onClose }: Props) {
  const [user] = useAtom(userAtom);

  return (
    <div className={styles.modalContainer}>
      나다
      {user.nickname}
      <button onClick={onClose}>닫기</button>
    </div>
  );
}
