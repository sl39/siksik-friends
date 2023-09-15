import styles from "./home.module.css";
import StartBtn from "@/containers/home/startBtn";

export default function Home() {
  return (
    <div className={styles.container}>
      <div>오늘 날짜</div>
      <div>워드클라우드</div>
      <div>간단 프로필</div>
      <StartBtn />
    </div>
  );
}
