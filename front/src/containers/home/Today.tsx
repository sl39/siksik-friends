import styles from "./home.module.css";

export default function Today() {
  const todayDate = new Date();

  return (
    <div className={styles.dateContainer}>
      <div className={styles.date}>
        <span>{todayDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
