"use client";

import "@/styles/homeNav.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathName = usePathname();

  const navLink = [
    {
      name: "홈",
      link: "/home",
    },
    {
      name: "랭킹",
      link: "/home/rank",
    },
    {
      name: "프로필",
      // link: `home/profile/${user_id}`,
      link: `/home/profile/1`,
    },
  ];

  return (
    <nav className="home-nav z-6">
      {navLink.map(({ link, name }) => (
        <Link key={name} href={link} className={`nav-item ${pathName === link ? "active" : ""}`}>
          <div className="nav-text">{name}</div>
        </Link>
      ))}
    </nav>
  );
}
