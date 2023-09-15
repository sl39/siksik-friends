"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function StartBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/game/wait");
  };

  return <Button text="Start!" onClick={handleClick} />;
}
