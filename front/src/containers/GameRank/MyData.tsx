import type { Room, SoketUser } from "@/types";
import styles from "./rankpage.module.scss";

interface Props {
  myInfo: SoketUser;
  roomInfoPlay: Room;
}

export default function MyData({ myInfo, roomInfoPlay }: Props) {
  // const { myInfo, roomInfoPlay } = data;
  return (
    <div>
      <div>내정보 데이터</div>
      <div className={styles.clay}>
        <p>유저 이름: {myInfo.userName}</p> <br />
        <p>유저 맞힌 점수: {myInfo.gameScore}</p>
        <br />
        <p>유저 점수: {myInfo.userScore}</p>
        <br />
        <p>유저 랭킹: {myInfo.userRanking}</p>
        <br />
        <p>
          유저 맞힌 문제 수: {myInfo.gameCorrect}/{roomInfoPlay.quizCount}
        </p>
        <br />
      </div>
    </div>
  );
}
