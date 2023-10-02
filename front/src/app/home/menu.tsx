"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userAtom } from "@/store/userAtom";

export default function Menu() {
  const pathName = usePathname();
  const [user] = useAtom(userAtom);

  const navLink = [
    {
      name: "홈",
      linkName: "home",
      link: "/home",
    },
    {
      name: "랭킹",
      linkName: "rank",
      link: "/home/rank",
    },
    {
      name: "프로필",
      linkName: "profile",
      link: user ? `/home/profile/${user.user_id}` : `/sign-up`,
    },
  ];

  return (
    <nav className="home-nav z-6">
      {navLink.map(({ link, name, linkName }) => {
        // pathName에서 '/home/' 부분을 제거하고 남은 부분에 linkName이 들어가는 지 확인
        let isActive;
        if (link === "/home") {
          isActive = pathName === "/home";
        } else {
          isActive = pathName.replace("/home/", "").includes(linkName);
        }
        return (
          <Link key={name} href={link} className={`nav-item ${isActive ? "active" : ""}`}>
            <div className="nav-text">{name}</div>
          </Link>
        );
      })}
    </nav>
  );
}
