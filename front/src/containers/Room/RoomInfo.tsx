// import { userAtom } from "@/store/userAtom";
import Image from "next/image";
import type { Room } from "@/types";
import styles from "./room.module.scss";

interface Props {
  room: Room;
}

export default function RoomData({ room }: Props) {
  // console.log(room);

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
          <div className={styles.quizInfoContent}>
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

            <div>
              <Image
                className={styles.worm}
                src="/images/actor/bulea2.png"
                alt="worm"
                sizes="10vw"
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
