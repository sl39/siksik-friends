"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WebSocketProvider from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import Exit from "./quit";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    // const isClient = typeof window !== "undefined";

    // if (isClient) {
    const fetchUserData = async () => {
      try {
        const response = await serverAxios("/user/my-info");
        setUser(response.data);
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert("잘못된 접근입니다");
        router.replace("/sign-up");
      }
    };
    if (user.user_id === 0) {
      fetchUserData();
    }
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="book-cover">
      <WebSocketProvider>
        <Exit />
        <div className="book-page1 " />
        <div className="book-page2 " />
        <div className="book-page ">
          <div className="main-container z-5">{children}</div>
        </div>
      </WebSocketProvider>
    </div>
  );
}
