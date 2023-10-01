import type { RoomInfo } from "@/types";
import styles from "./room.module.scss";

interface Props {
  room: RoomInfo;
}

export default function RoomData({ room }: Props) {
  return (
    <div className={styles.roomData}>
      <div>방제목 {room.title}</div>
      <div>최대인원 {room.count}</div>
      <div>문제 수 {room.countProblem}</div>
      <div>문제유형 {room.type}</div>
    </div>
  );
}
