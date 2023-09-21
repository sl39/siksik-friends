import SimpleMyProfile from "@/components/SimpleMyProfile";
import Chatting from "./Chatting";
import GameRoom from "./GameRoom";
import WaitingUser from "./WaitingUser";
import styles from "./game.module.scss";

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <GameRoom />
        <div className={styles.chatBox}>
          <Chatting />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.waitingBox}>
          <WaitingUser />
        </div>
        <div className={styles.profileItem}>
          <SimpleMyProfile />
        </div>
      </div>
    </div>
  );
}
