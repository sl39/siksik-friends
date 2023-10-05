"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import Menu from "./menu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
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
      <div className="book-page1" />
      <div className="book-page2" />
      <Menu />
      <div className="book-page">
        <div className="main-container z-5">{children}</div>
      </div>
    </div>
  );
}
