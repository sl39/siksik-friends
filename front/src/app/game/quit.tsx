"use client";

import { useRouter } from "next/navigation";

export default function BackNav() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <nav className="back-nav z-4">
      <button onClick={handleClick} className="nav-item back">
        <div className="nav-text">나가기</div>
      </button>
    </nav>
  );
}
