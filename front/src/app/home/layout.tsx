"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import Menu from "./menu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await serverAxios("/user/my-info");
        setUser(response.data);
      } catch (err) {
        // console.error("새로고침", err);
        // eslint-disable-next-line no-alert
        alert("잘못된 접근입니다");
        router.replace("/sign-up");
      }
    };
    fetchUserData();
    if (user.user_id === 0) {
      // eslint-disable-next-line no-alert
      alert("잘못된 접근입니다");
      router.replace("/sign-up");
      // router.replace("/");
    }
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
