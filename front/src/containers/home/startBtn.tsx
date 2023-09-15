"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function StartBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/game/wait");
  };

  return <Button text="Start!" onClick={handleClick} />;
}
