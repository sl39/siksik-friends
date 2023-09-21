"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAtom } from "jotai";
import type { User } from "@/types";
// import { localUser } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import styles from "./form.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const setUser = useAtom(localUser)[1];

  /** 로그인 POST */
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };
    try {
      const response = await serverAxios.post("/sign-in", formData);
      console.log(response);
      // 토큰 저장
      sessionStorage.setItem("accessToken", response.headers.authorization);
      localStorage.setItem("refreshToken", response.headers["authorization-refresh"]);

      const newUser: User = {
        id: Date.now(),
        email: formData.email,
      };
      // setUser(newUser);
      // localStorage에 업데이트된 값을 저장
      localStorage.setItem("user", JSON.stringify(newUser));
      router.push("/home");
    } catch (error) {
      console.log("로그인 에러", error);
    }

    /**  서버 연결 전 임시 데이터 */
    // const tempUser: User = {
    //   id: Date.now(),
    //   email: "임시이메일",
    // };
    // setUser(tempUser);
    // // localStorage에 업데이트된 값을 저장
    // localStorage.setItem("user", JSON.stringify(tempUser));
    // router.push("/home");
  };

  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <h1 className={styles.formTitle}>로그인</h1>

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
      <button type="submit" className={[styles.button, styles.btnAct].join(" ")}>
        확인
      </button>
    </form>
  );
}
