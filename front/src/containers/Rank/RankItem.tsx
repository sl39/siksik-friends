import styles from "./Rank.module.css";
import RankButton from "./RankButton";
import { Rank } from "@/types";

interface Props {
  item: Rank;
}

export default function RankItem({ item }: Props) {
  return (
    <div className={styles.RankItem}>
      <span className={[styles.itemNum].join(" ")}>{item.rank}위</span>
      <span className={[styles.rankLevel].join(" ")}>{item.level}</span>
      <span className={[styles.rankName].join(" ")}>{item.name}</span>
      <RankButton id={item.id} />
    </div>
  );
}
