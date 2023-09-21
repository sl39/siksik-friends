import dynamic from "next/dynamic";
import StartBtn from "@/containers/home/startBtn";
import styles from "./home.module.scss";
import Today from "./Today";
// import WordCloud from "./WordCloud";
import MyProfileCard from "@/components/MyProfileCard";

export default function Home() {
  const DynamicComponentWithNoSSR = dynamic(() => import("./WordCloud"), { ssr: false });
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* 일단 오늘 날짜, 선택되게 바뀔 수 있음 */}
        <Today />
        <DynamicComponentWithNoSSR />
      </div>
      <div className={styles.right}>
        <div className={styles.cardContainer}>
          <MyProfileCard />
        </div>
        <div className={styles.buttonContainer}>
          <StartBtn />
        </div>
      </div>
    </div>
  );
}
