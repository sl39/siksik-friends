import type { Room, SoketUser } from "@/types";
import styles from "./rankpage.module.scss";

interface Props {
  myInfo: SoketUser;
  room: Room;
  scoreData?: SoketUser[];
}

export default function MyData({ myInfo, room, scoreData }: Props) {
  const { userId } = myInfo;
  const index = scoreData?.findIndex((member) => member.userId === userId);

  return (
    <>
      <div className={`${styles.clay} ${styles.rankRoomInfo}`}>
        <div className={styles.roomName}>{room.roomName}</div>
        <div className={styles.roomCate}>
          <span>카테고리</span> {room.category}
        </div>
        <div className={styles.roomDate}>
          <span>문제날짜</span> {room.quizDate}
        </div>
      </div>

      <div className={`${styles.clay} ${styles.rankMyInfo}`}>
        <div className={styles.rankName}>{myInfo.userName}</div>
        <div className={styles.rankB}>
          <span>얻은 점수</span>
          {myInfo.gameScore} 점
        </div>
        <div className={styles.rankB}>
          <span>맞춘 문제</span>
          {myInfo.gameCorrect} / {room.quizCount} 문제
        </div>
        <div className={styles.rankB}>
          <span>등수</span>
          {index! + 1}위
        </div>
      </div>
    </>
  );
}
