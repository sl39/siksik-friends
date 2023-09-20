import styles from "./page.module.scss";
import Login from "@/containers/Login/LoginModal";
import MainTitle from "@/containers/MainTitle";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={`${styles.Logo}`}>
        <MainTitle data="식" />
        <MainTitle data="식" />
        <MainTitle data="프" />
        <MainTitle data="렌" />
        <MainTitle data="즈" />
      </div>
      <Login />
    </div>
  );
}
