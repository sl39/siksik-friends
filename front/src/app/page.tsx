"use client";

import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  // const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const fncSoundPlay = () => {
    // if (!isMusicPlaying) {
    //   const audio = new Audio();
    //   audio.src = "/music/BGM.wav";
    //   audio.loop = true;
    //   audio.volume = 1;
    //   audio.play();
    //   setIsMusicPlaying(true);
    // }
  };

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
        <Link href="/sign-up" className={[styles.start, styles.login].join(" ")} onClick={fncSoundPlay}>
          <span>Click To Start</span>
        </Link>
      </div>
    </div>
  );
}
