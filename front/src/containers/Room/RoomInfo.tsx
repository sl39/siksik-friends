// import { userAtom } from "@/store/userAtom";
import type { Room } from "@/types";
import styles from "./room.module.scss";

interface Props {
  room: Room;
}

export default function RoomData({ room }: Props) {
  // const user = userAtom.init;
  console.log(room);

  return (
    <div className={styles.roomData}>
      <div className={styles.roomContent}>
        <span>방 제목</span> {room?.roomName}
      </div>
      <div className={styles.roomContent}>
        <span>인원</span> {room?.roomCurrent} / {room?.roomSize}
      </div>
      <div className={styles.roomContent}>
        <div className={styles.quizCount}>{room?.quizCount} 문제</div>
        <div className={styles.category}>[{room?.category}]</div>
      </div>
    </div>
  );
}
