import AllRank from "./AllRank";
import styles from "./Rank.module.css";
import MyProfileCard from "@/components/MyProfileCard";

export default function index() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <MyProfileCard />
        <div>내등수</div>
      </div>
      <div className={styles.right}>
        <AllRank />
      </div>
    </div>
  );
}
