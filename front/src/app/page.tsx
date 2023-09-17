import LoginModal from "@/containers/Login/LoginModal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.Logo}>식식프렌즈로고대체</div>
      {/* 로그인은 모달이고 회원가입은 페이지 */}
      <LoginModal />
    </div>
  );
}
