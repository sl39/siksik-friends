"use client";

import { serverAxios } from "@/services/api";

export default function JWTTest() {
  const handleTest = async () => {
    try {
      const response = await serverAxios("/auth/jwt-test");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <p>JWT 테스트용</p>
      <button onClick={handleTest}>get jwt-test</button>
    </div>
  );
}
