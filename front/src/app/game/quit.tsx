"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackNav() {
  const [isQuit, setIsQuit] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  console.log("===", pathName);

  useEffect(() => {
    if (pathName === "/game" || pathName.includes("/game/start/room/")) {
      setIsQuit(true);
    } else {
      setIsQuit(false);
    }
  }, []);

  const handleClick = () => {
    if (pathName === "/game") {
      router.replace("/home");
    } else if (pathName.includes("/game/start/room/")) {
      router.replace("/game");
    }
  };

  return (
    isQuit && (
      <nav className="back-nav z-4">
        <button onClick={handleClick} className="nav-item back">
          <div className="nav-text">나가기</div>
        </button>
      </nav>
    )
  );
}
