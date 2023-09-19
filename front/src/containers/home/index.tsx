import StartBtn from "@/containers/home/startBtn";
import styles from "./home.module.css";
import Today from "./Today";
import WordCloud from "./WordCloud";
import MyProfileCard from "@/components/MyProfileCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 일단 오늘 날짜, 선택되게 바뀔 수 있음 */}
        <Today />
        <WordCloud />
      </div>
      <div className={styles.right}>
        <MyProfileCard />
        <StartBtn />
      </div>
    </div>
  );
}
