import styles from "@/app/page.module.css";
import SignUp from "@/containers/SignUp";

//회원가입은 모달을 닮은 페이지
export default function Login() {
  return (
    <div className={styles.main}>
      <SignUp />
    </div>
  );
}
