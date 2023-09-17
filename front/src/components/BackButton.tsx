// 뒤로가기 버튼

"use client";

import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function BackButton({ className }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button className={className} onClick={handleClick}>
      뒤로 가기
    </button>
  );
}
