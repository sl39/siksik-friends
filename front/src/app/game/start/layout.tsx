"use client";

import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const roomId = params.id;
  return <>{children}</>;
}
