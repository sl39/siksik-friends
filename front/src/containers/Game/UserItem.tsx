import type { User } from "@/types";
import styles from "./game.module.scss";

interface Props {
  data: User;
}

export default function UserItem({ data }: Props) {
  return (
    <div className={styles.userItem}>
      <div className={styles.profile}>{data.profile}</div>
      <div className={styles.userItemBox}>
        <div className={styles.subBox}>{data.level}</div>
        <div className={styles.subBox}>{data.nickname}</div>
      </div>
    </div>
  );
}
