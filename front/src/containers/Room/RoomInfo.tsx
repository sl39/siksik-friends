// import { userAtom } from "@/store/userAtom";
import Image from "next/image";
import type { Room } from "@/types";
import styles from "./room.module.scss";

interface Props {
  room: Room;
}

export default function RoomData({ room }: Props) {
  return (
    <div className={styles.roomData}>
      <div className={styles.roomName}>
        <span>{room?.roomName}</span>
      </div>

      <div className={styles.bottomInfo}>
        <div className={styles.quizInfo}>
          <div className={styles.quizInfoTitle}>
            <span>문제정보</span>
          </div>
          <div className={`${styles.quizInfoContent} ${styles.left}`}>
            <p>{room?.category}</p>
            <p>{room?.quizCount} 문제</p>
            <p>{room?.quizDate}</p>
          </div>
        </div>
        <div className={styles.quizInfo}>
          <div className={styles.quizInfoTitle}>
            <span>인원</span>
          </div>
          <div className={styles.quizInfoContent}>
            <p>
              {room?.roomCurrent} / {room?.roomSize}
            </p>

            <div className={styles.worm}>
              <Image
                src="/images/actor/bulea1.png"
                alt="worm"
                sizes="30vw"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className={styles.alice}>
              <Image
                src="/images/actor/alice4.png"
                alt="alice"
                sizes="30vw"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
