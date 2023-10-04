"use client";

import SubscriptionQuiz from "@/socket/SubscriptionQuiz";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const roomId = Number(params.id);
  return (
    <>
      <SubscriptionQuiz roomId={roomId}>{children}</SubscriptionQuiz>
    </>
  );
}
