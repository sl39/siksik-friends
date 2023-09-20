import RoomUser from "./RoomUser";
import StartBtn from "./StartBtn";
import styles from "./room.module.scss";

export default function index() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.roomInfo}>게임정보</div>
        <div className={styles.chatting}>채팅창</div>
      </div>
      <div className={styles.right}>
        <div className={styles.roomUser}>
          <RoomUser />
        </div>
        <div className={styles.startBtn}>
          <StartBtn />
        </div>
      </div>
    </div>
  );
}
