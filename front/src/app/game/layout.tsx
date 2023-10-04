"use client";

import { Provider, useAtom } from "jotai";
import { useEffect } from "react";
import WebSocketProvider from "@/socket/WebSocketProvider";
import { serverAxios } from "@/services/api";
import { userAtom } from "@/store/userAtom";
import Exit from "./quit";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [, setUserData] = useAtom(userAtom);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverAxios("/user/my-info");
        setUserData(response.data);
      } catch (err) {
        console.log("유저 정보 에러", err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="book-cover">
      <WebSocketProvider>
        <Provider>
          <Exit />
          <div className="book-page1 " />
          <div className="book-page2 " />
          <div className="book-page ">
            <div className="main-container z-5">{children}</div>
          </div>
        </Provider>
      </WebSocketProvider>
    </div>
  );
}
