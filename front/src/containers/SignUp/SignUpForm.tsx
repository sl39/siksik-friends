import styles from "./SignUp.module.css";

export default function SignUpForm() {
  return (
    <form action="" className={styles.form}>
      <div>
        <label htmlFor="id">email</label>
        <input type="text" id="id" />
        <button type="button" className={[styles.button, styles.check].join(" ")}>
          중복확인
        </button>
      </div>
      <div>
        <label htmlFor="password1">비밀번호</label>
        <input type="text" id="password1" />
      </div>
      <div>
        <label htmlFor="password2">비밀번호 확인</label>
        <input type="text" id="password2" />
      </div>
      <button type="submit" className={styles.button}>
        회원가입
      </button>
    </form>
  );
}
