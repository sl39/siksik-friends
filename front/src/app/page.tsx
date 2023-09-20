import styles from "./page.module.scss";
import Link from "next/link";
import Login from "@/containers/Login/LoginModal";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.logo}>
        <div>
          <span>식</span>
          <span>식</span>
          <span>프</span>
          <span>렌</span>
          <span>즈</span>
        </div>
      </h1>
      <div className={styles.buttonContainer}>
        <Link href="/sign-up" className={[styles.start, styles.login].join(" ")}>
          <span>Click To Start</span>
        </Link>
      </div>
    </div>
  );
}
