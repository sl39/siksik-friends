"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import type { User } from "@/types";
// import { localUser } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import styles from "./Login.module.scss";

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
    <form className={styles.loginForm} onSubmit={handleSignIn}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
      </div>
      <button type="submit" className={[styles.button, styles.btnAct].join(" ")}>
        확인
      </button>
    </form>
  );
}
