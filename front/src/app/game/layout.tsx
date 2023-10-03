"use client";

import { Provider } from "jotai";
import Exit from "./quit";
import WebSocketProvider from "@/socket/WebSocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
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
