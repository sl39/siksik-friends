import { useRouter } from "next/navigation";
import type { Room } from "@/types";
import styles from "./game.module.scss";

interface GameRoomItemProps {
  room: Room;
}

export default function GameRoomItem({ room }: GameRoomItemProps) {
  const router = useRouter();

  const enterRoom = (id: number) => {
    router.push(`/game/room/${id}`);
  };
  return (
    <button onClick={() => enterRoom(room.roomId)} className={styles.roomItem}>
      <div className={styles.roomId}>{room.roomId}</div>
      <div className={styles.roomData}>
        <div className={styles.name}>{room.roomName}</div>
        <div className={[room.roomStatus ? styles.playing : styles.waiting, styles.state].join(" ")}>
          {!room.roomStatus ? "WAITING" : "PLAYING"}
        </div>
      </div>
      <div className={styles.roomQuiz}>
        <div>{room.quizDateTime}</div>
        <div>{room.category}</div>
        <div>{room.quizCount}</div>
        <div>
          {room.roomCurrent} / {room.roomSize}
        </div>
      </div>
    </button>
  );
}
