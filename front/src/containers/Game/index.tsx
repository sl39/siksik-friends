import SimpleMyProfile from "./SimpleMyProfile";
// import Chatting from "./Chatting";
import GameRoom from "./GameRoom";
import WaitingUser from "./WaitingUser";
import styles from "./game.module.scss";

export default function Index() {
  return (
    <>
      <div id="game-modal" className="z-99" />
      <div className={styles.left}>
        <div className={styles.GameRoom}>
          <GameRoom />
        </div>
        <div className={styles.chatBox}>{/* <Chatting /> */}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.waitingBox}>
          <WaitingUser />
        </div>
        <div className={styles.profileItem}>
          <SimpleMyProfile />
        </div>
      </div>
    </>
  );
}
