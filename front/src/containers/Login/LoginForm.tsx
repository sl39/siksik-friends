"use client";

import styles from "./Login.module.css";

export default function LoginForm() {
  return (
    <form className={styles.loginForm} action="#">
      <div>
        <label htmlFor="id">Email</label>
        <input type="text" id="id" name="id" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="text" id="password" name="password" />
      </div>
      <button type="submit" className={styles.button}>
        확인
      </button>
    </form>
  );
}
