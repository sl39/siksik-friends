import styles from "./home.module.css";
import StartBtn from "./startBtn";

export default function Home() {
  return (
    <>
      <h1>나는 인덱스</h1>

      <div className={styles.date}>오늘 날짜</div>
      <div className={styles.wordCloud}>워드클라우드</div>
      <div className={styles.profile}>간단 프로필</div>
      <div className={styles.startBtn}>게임 시작 버튼</div>
    </>
  );
}
