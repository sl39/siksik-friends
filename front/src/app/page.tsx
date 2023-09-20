import Login from "@/containers/Login/LoginModal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 data-shadow="식식프렌즈" className={styles.Logo}>
        식식프렌즈로고로고
      </h1>
      <Login />
    </div>
  );
}
