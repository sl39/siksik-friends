"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WebSocketProvider from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import Exit from "./quit";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await serverAxios("/user/my-info");
        // const response = await serverAxios("/user/my-info");
        // setUser(response.data);
      } catch (err) {
        console.error("새로고침", err);
        router.replace("/sign-up");
      }
    };
    fetchUserData();
    if (user.user_id === 0) {
      router.replace("/");
    }
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
