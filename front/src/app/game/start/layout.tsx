"use client";

import { useParams } from "next/navigation";
import SubscriptionQuiz from "@/socket/SubscriptionQuiz";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const roomId = Number(params.id);
  return <SubscriptionQuiz roomId={roomId}>{children}</SubscriptionQuiz>;
}
