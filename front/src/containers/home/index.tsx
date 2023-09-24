import dynamic from "next/dynamic";
import StartBtn from "@/containers/home/startBtn";
import type { User } from "@/types";
import styles from "./home.module.scss";
import Today from "./Today";
import MyProfileCard from "@/components/MyProfileCard";

export default function Home({ myData }: { myData: User }) {
  const DynamicComponentWithNoSSR = dynamic(() => import("./WordCloud"), { ssr: false });
  return (
    <>
      <div className={styles.left}>
        <div className={styles.leftDay}>
          <Today />
        </div>
        <div className={styles.wordCloud}>
          <DynamicComponentWithNoSSR />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.cardContainer}>
          <MyProfileCard data={myData} />
        </div>
        <div className={styles.buttonContainer}>
          <StartBtn />
        </div>
      </div>
    </>
  );
}
