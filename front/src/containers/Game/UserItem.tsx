import styles from "./game.module.scss";

export default function UserItem() {
  return (
    <div className={styles.userItem}>
      <div className={styles.profile}>프로필</div>
      <div className={styles.userItemBox}>
        <div className={styles.subBox}>레벨</div>
        <div className={styles.subBox}>닉네임</div>
      </div>
    </div>
  );
}
