import { atom } from "jotai";
import type { User } from "@/types";

// export const userAtom = atom<User>({} as User);
export const userAtom = atom<User>({
  user_id: 0,
  email: "",
  nickname: "",
  profile: "/images/character/rabbit.png",
  odds: "",
  rank: 999,
  exp: 0,
  score: 10,
  level: 1,
});

export const profileAtom = atom<User>({
  user_id: 0,
  email: "",
  nickname: "",
  profile: "/images/character/rabbit.png",
  odds: "",
  rank: 999,
  exp: 0,
  score: 10,
  level: 1,
});
