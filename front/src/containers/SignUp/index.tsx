import BackButton from "@/components/BackButton";
import styles from "./SignUp.module.css";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.context}>
        <div className={styles.title}>회원가입</div>
        <SignUpForm />
        <BackButton className={styles.button} />
      </div>
    </div>
  );
}
