import styles from "@/app/page.module.scss";

interface Props {
  data: string;
}

export default function MainTitle({ data }: Props) {
  return (
    <span className={styles.text}>
      {data.split("").map((char, i) => (
        <div className={styles.letter} style={{ "--delay": `${i * 0.2}s` }}>
          <span className={[styles.source].join(" ")}>{char}</span>
          <span className={[styles.shadow].join(" ")}>{char}</span>
          <span className={[styles.overlay].join(" ")}>{char}</span>
        </div>
      ))}
    </span>
  );
}
