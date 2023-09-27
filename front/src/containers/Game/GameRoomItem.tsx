import { useRouter } from "next/navigation";
import type { Room } from "@/types";
import styles from "./game.module.scss";

interface GameRoomItemProps {
  room: Room;
}

export default function GameRoomItem({ room }: GameRoomItemProps) {
  const router = useRouter();

  const enterRoom = (id: number) => {
    router.push(`/room/${id}`);
  };
  return (
    <button onClick={() => enterRoom(room.id)} className={styles.roomItem}>
      <div className={styles.roomId}>{room.id}</div>
      <div className={styles.roomData}>
        <div className={styles.name}>{room.name}</div>
        <div className={[room.waiting ? styles.waiting : styles.playing, styles.state].join(" ")}>
          {room.waiting ? "WAITING" : "PLAYING"}
        </div>
      </div>
      <div className={styles.roomQuiz}>
        <div>2023.09.12 - 2023.09.13</div>
        <div>카테고리</div>
        <div>00문제</div>
      </div>
    </button>
  );
}
