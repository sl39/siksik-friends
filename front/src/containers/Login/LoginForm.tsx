"use client";
import styles from "./Login.module.css";

export default function LoginForm(params) {
  return (
    <form className={styles.loginForm} action="">
      <label htmlFor="id">Email</label>
      <input type="text" />

      <label htmlFor="password">비번</label>
      <input type="text" />
      <button>확인</button>
    </form>
  );
}
