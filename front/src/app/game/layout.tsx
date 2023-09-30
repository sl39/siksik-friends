"use client";

import { Provider } from "jotai";
import Exit from "./quit";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="book-cover">
      <Provider>
        <Exit />
        <div className="book-page1 " />
        <div className="book-page2 " />
        <div className="book-page ">
          <div className="main-container z-5">{children}</div>
        </div>
      </Provider>
    </div>
  );
}
