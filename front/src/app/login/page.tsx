// 예제 변경중

"use client";

import { useState } from "react";
import Input from "@/components/input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /** 로그인 로직 */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={username} onChange={setUsername} placeholder="Username" />
      <Input value={password} onChange={setPassword} placeholder="Password" type="password" />
      <button type="submit">Log In</button>
    </form>
  );
}
