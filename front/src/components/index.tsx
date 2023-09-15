import styles from "./home.module.css";
import StartBtn from "../containers/home/startBtn";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>나는 인덱스</h1>

      <div className={styles.date}>오늘 날짜</div>
      <div className={styles.wordCloud}>워드클라우드</div>
      <div className={styles.profile}>간단 프로필</div>
      <StartBtn />
    </div>
  );
}
