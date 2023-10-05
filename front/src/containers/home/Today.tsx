import styles from "./home.module.scss";

export default function Today() {
  const todayDate = new Date();

  const formattedDate = todayDate
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/. /g, "."); // '.'과 공백 사이를 '.'으로 교체

  return (
    <div className={styles.date}>
      <span>{formattedDate}</span>
    </div>
  );
}
