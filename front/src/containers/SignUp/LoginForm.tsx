"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { serverAxios } from "@/services/api";
import styles from "./form.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  /** 로그인 POST 요청 */
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await serverAxios.post("/auth/sign-in", formData);
      // 토큰 저장
      await sessionStorage.setItem("accessToken", response.headers.authorization);
      router.push("/home");
    } catch (error) {
      console.log("로그인 에러", error);
      setLoginError("이메일 또는 비밀번호를 확인해주세요");
    }
  };

  return (
    <form className={`${styles.form} ${styles.loginForm}`} onSubmit={handleSignIn}>
      <h1 className={styles.formTitle}>로그인</h1>
      <div className={styles.formDiv}>
        <div className={styles["form-group"]}>
          <input
            className={styles["form-style"]}
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="loginEmail"
            name="email"
          />
        </div>
        <div className={styles["form-group"]}>
          <input
            className={styles["form-style"]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="loginPassword"
            name="password"
            placeholder="비밀번호"
          />
        </div>
        <span className={styles.ErrorMsg}>{loginError}</span>
        <button type="submit" className={[styles.button, styles.btnAct].join(" ")}>
          확인
        </button>
      </div>
    </form>
  );
}
