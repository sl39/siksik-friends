"use client";
import { useRouter } from "next/navigation";
import styles from "./Rank.module.css";

interface Props {
  readonly id: number;
}

export default function RankButton({ id }: Props) {
  const router = useRouter();

  const onClick = (id: number) => {
    router.push(`profile/${id}`);
  };
  return (
    <button className={styles.RankButton} onClick={() => onClick(id)}>
      정보 보기
    </button>
  );
}
