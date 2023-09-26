"use client";

import { Provider } from "jotai";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="book-cover">
      <div className="book-page1 " />
      <div className="book-page2 " />
      <div className="book-page ">
        <Provider>
          <div className="main-container z-5">{children}</div>
        </Provider>
      </div>
    </div>
  );
}
