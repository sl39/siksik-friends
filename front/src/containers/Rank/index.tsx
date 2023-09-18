import AllRank from "./AllRank";
import MyRank from "./MyRank";
import styles from "./Rank.module.css";
import MyProfileCard from "@/components/MyProfileCard";

export default function index() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <MyProfileCard />
        <MyRank />
      </div>
      <div className={styles.right}>
        <AllRank />
      </div>
    </div>
  );
}
