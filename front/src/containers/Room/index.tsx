import StartBtn from "./StartBtn";
import styles from "./room.module.scss";

export default function index() {
  // 방 정보를 요청받아온다.

  const gameId = 1;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.roomInfo}>게임정보</div>
        <div className={styles.chatting}>채팅창</div>
      </div>
      <div className={styles.right}>
        <div className={styles.roomUser}>{/* 그거 컴포넌트 정리해서 가져오기 */}</div>
        <div className={styles.startBtn}>
          <StartBtn gameId={gameId} />
        </div>
      </div>
    </div>
  );
}
