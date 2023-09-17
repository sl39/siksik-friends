import Login from "@/containers/Login/LoginModal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.Logo}>식식프렌즈 로고 가져오기</div>
      <Login />
    </div>
  );
}
