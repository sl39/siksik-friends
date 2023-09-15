import Link from "next/link";
import styles from "./page.module.css";
import Modal from "@/containers/modalPortal";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>식식프렌즈</h1>
      <Link href="/login">로그인</Link> <br />
      <Link href="/home">홈먼저 만들거야</Link>
      <Modal />
    </div>
  );
}
