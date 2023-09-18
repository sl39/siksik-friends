import GameRoom from "./GameRoom";
import styles from "./game.module.css";

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <GameRoom />
      </div>
      <div className={styles.right}>xx</div>
    </div>
  );
}
