import Chatting from "./Chatting";
import GameRoom from "./GameRoom";
import styles from "./game.module.scss";

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <GameRoom />
        <Chatting />
      </div>
      <div className={styles.right}>xx</div>
    </div>
  );
}
