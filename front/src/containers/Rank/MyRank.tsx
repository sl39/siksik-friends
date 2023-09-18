import styles from "./Rank.module.css";

interface Rank {
  rank?: number | string;
}

export default function MyRank({ rank = "999+" }: Rank) {
  return (
    <div className={styles.myRank}>
      <div className={styles.rankNum}>{rank} 등</div>
    </div>
  );
}
