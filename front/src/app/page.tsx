import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.logo}>
        <span>식</span>
        <span>식</span>
        <span>프</span>
        <span>렌</span>
        <span>즈</span>
      </h1>
      <div className={styles.buttonContainer}>
        <Link href="/sign-up" className={[styles.start, styles.login].join(" ")}>
          <span>Click To Start</span>
        </Link>
      </div>
    </div>
  );
}
