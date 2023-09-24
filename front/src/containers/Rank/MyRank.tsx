import Image from "next/image";
import styles from "./Rank.module.css";

interface Props {
  rank?: number | string;
}

export default function MyRank({ rank }: Props) {
  return (
    <>
      <div className={styles.rankContainer} />
      <Image className={styles.myRank} src="/images/rank.png" alt="나의 도장" fill sizes="120%" priority />
      <div className={styles.rankNum}>{rank} 등</div>
    </>
  );
}
