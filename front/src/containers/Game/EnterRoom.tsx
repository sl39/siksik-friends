import styles from "./game.module.scss";

export default function EnterRoom() {
  return (
    <>
      <div>
        <button className={styles.boxButton}>빠른시작</button>
        <button className={styles.boxButton}>방 찾기</button>
      </div>
      <button className={styles.boxButton}>방 만들기</button>
    </>
  );
}
