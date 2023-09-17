import styles from "./Rank.module.css";
import RankButton from "./RankButton";

interface Props {
  item: {
    id: number;
    rank: number;
    name: string;
    level: number;
  };
}

export default function RankItem({ item }: Props) {
  return (
    <div className={styles.RankItem}>
      <span>{item.rank}</span>
      <span>{item.level}</span>
      <span>{item.name}</span>
      <RankButton id={item.id} />
    </div>
  );
}
