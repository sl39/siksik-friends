import { BsTrophy } from "react-icons/bs";
import styles from "./play.module.scss";

interface Props {
  data?: any;
}

export default function Score({ data }: Props) {
  return (
    <div className={styles.leaderboard}>
      <h1>
        <span className={styles.icon}>
          <BsTrophy size={24} />
        </span>
        현재 순위
      </h1>

      <ol>
        {data.map((item: any) => (
          <li key={item.name}>
            <mark>{item.name}</mark>
            <small>{item.score}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
