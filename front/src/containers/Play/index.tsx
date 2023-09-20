import styles from "./play.module.scss";

export default function GamePlay() {
  return (
    <>
      <div className={styles.top}>타이머</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>문제정보</div>
          <div>정답입력창</div>
        </div>
        <div className={styles.right}>채팅</div>
      </div>
    </>
  );
}
