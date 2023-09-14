// import Image from "next/image";
import Background from "public/images/background.png";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      {/* <img src={Background} width="100%" height="100%" alt="~" /> */}
      <h1>식식프렌즈</h1>
      <Link href="/login">로그인</Link>
    </div>
  );
}
