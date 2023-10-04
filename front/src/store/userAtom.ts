import { atom } from "jotai";
import type { User } from "@/types";

// export const userAtom = atom<User>({} as User);
export const userAtom = atom<User>({
  user_id: 10,
  email: "이메일",
  nickname: "나는희영나는희영나",
  profile: "/images/character/rabbit2.png",
  odds: "",
  rank: 999,
  exp: 0,
  score: 10,
  level: 9,
});

export const profileAtom = atom<User>({
  user_id: 0,
  email: "프로필이메일",
  nickname: "프로필닉네임",
  profile: "/images/character/rabbit.png",
  odds: "",
  rank: 999,
  exp: 0,
  score: 10,
  level: 1,
});

export const ProfileImgAtom = atom<Array<string>>([
  "/images/character/rabbit.png",
  "/images/character/rabbit1.png",
  "/images/character/rabbit2.png",
  "/images/character/rabbit3.png",
  "/images/character/rabbit4.png",
  "/images/character/rabbit5.png",
  "/images/character/rabbit6.png",
  "/images/character/rabbit7.png",
  "/images/character/rabbit8.png",
  "/images/character/rabbit9.png",
  "/images/character/rabbit10.png",
  "/images/character/rabbit11.png",
  "/images/character/rabbit12.png",
  "/images/character/rabbit13.png",
  "/images/character/rabbit14.png",
  "/images/character/rabbit15.png",
]);

export const levelAtom = atom<Array<string>>([
  "images/thrumpCards/red_joker.png",
  "/images/thrumpCards/01_spade.png",
  "/images/thrumpCards/02_dia.png",
  "/images/thrumpCards/03_clover.png",
  "/images/thrumpCards/04_heart.png",
]);
