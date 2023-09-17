import styles from "./home.module.css";
import Today from "./Today";
import StartBtn from "@/containers/home/startBtn";
import WordCloud from "./WordCloud";
import Profile from "./Profile";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 일단 오늘 날짜인데, 바뀔 수 있음 */}
        <Today />
        <WordCloud />
      </div>
      <div className={styles.right}>
        <Profile />
        <StartBtn />
      </div>
    </div>
  );
}
