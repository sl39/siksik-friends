import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={`${styles.alice} ${styles.image}`}>
        <Image src="/images/actor/alice4.png" alt="alice" sizes="10vw" fill style={{ objectFit: "contain" }} />
      </div>
      {/* <div className={`${styles.cat} ${styles.image}`}>
        <Image src="/images/actor/cat2.png" alt="cat" sizes="10vw" fill style={{ objectFit: "contain" }} />
      </div> */}
      <div className={`${styles.dodo} ${styles.image}`}>
        <Image src="/images/actor/dodo3.png" alt="dodo" sizes="10vw" fill style={{ objectFit: "contain" }} />
      </div>

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
