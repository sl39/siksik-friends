import styles from "./page.module.scss";
import Login from "@/containers/Login/LoginModal";
import MainTitle from "@/containers/MainTitle";

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
      <Login />
    </div>
  );
}
