"use client";
import { useRouter } from "next/navigation";

export default function StartBtn() {
  const router = useRouter();

  /** 게임으로 연결하는 함수 */
  const handleStart = () => {
    router.push(`/`);
  };

  return <button onClick={handleStart}>게임시작</button>;
}
