import styles from "./Rank.module.css";
import RankItem from "./RankItem";

export default function AllRank() {
  const rankArray = [
    { id: 1, rank: 1, name: "11", level: 10 },
    { id: 2, rank: 2, name: "11", level: 10 },
    { id: 3, rank: 3, name: "11", level: 10 },
    { id: 4, rank: 4, name: "11", level: 10 },
    { id: 5, rank: 5, name: "11", level: 10 },
    { id: 6, rank: 6, name: "11", level: 10 },
    { id: 7, rank: 7, name: "11", level: 10 },
    { id: 8, rank: 8, name: "11", level: 10 },
    { id: 9, rank: 9, name: "11", level: 10 },
    { id: 10, rank: 10, name: "11", level: 10 },
  ];
  return (
    <div className={styles.RankArray}>
      {rankArray.map((item) => (
        <RankItem key={item.id} item={item} />
      ))}
    </div>
  );
}
