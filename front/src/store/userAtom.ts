import { atom } from "jotai";
import type { User } from "@/types";

// export const userAtom = atom<User>({} as User);
export const userAtom = atom<User>({
  user_id: 1,
  email: "tempEmail",
  nickname: "temp",
  profile: "/images/character/rabbit.png",
  odds: "승률",
  rank: 999,
  exp: 0,
  score: 10,
  level: 1,
});
