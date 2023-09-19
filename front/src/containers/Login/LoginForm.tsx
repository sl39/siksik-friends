"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** 로그인 로직 */
  const onSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 작성
    console.log(email, password);
    router.push("/home");
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => onSubmit(e)}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
      </div>
      <button type="submit" className={styles.button}>
        확인
      </button>
    </form>
  );
}
