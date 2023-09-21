import styles from "./page.module.scss";
import Link from "next/link";
import Login from "@/containers/Login/LoginModal";
<<<<<<< HEAD
=======
import styles from "./page.module.scss";
>>>>>>> 74ac2340f0f27316c78b27e6ceca58234d88c7b0

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.logo}>
<<<<<<< HEAD
        <div>
          <span>식</span>
          <span>식</span>
          <span>프</span>
          <span>렌</span>
          <span>즈</span>
        </div>
=======
        <span>식</span>
        <span>식</span>
        <span>프</span>
        <span>렌</span>
        <span>즈</span>
>>>>>>> 74ac2340f0f27316c78b27e6ceca58234d88c7b0
      </h1>
      <div className={styles.buttonContainer}>
        <Link href="/sign-up" className={[styles.start, styles.login].join(" ")}>
          <span>Click To Start</span>
        </Link>
      </div>
    </div>
  );
}
