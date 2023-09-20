import { Noto_Sans_KR, Poor_Story, IBM_Plex_Sans_KR, Jua } from "next/font/google";

export const notoSans = Noto_Sans_KR({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto",
});
export const logo = Jua({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-logo",
});

// 게임 내 기본 글꼴
export const poorStory = Poor_Story({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poor",
});

// 문제용 글꼴
export const IBMPlexSans = IBM_Plex_Sans_KR({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm",
});
