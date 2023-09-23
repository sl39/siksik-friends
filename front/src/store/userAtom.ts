import { atom } from "jotai";
import type { User } from "@/types";

// export const initUserAtom = atom<User | null>({
//   id: 1,
//   email: "test",
//   nickname: "test",
//   profile: "/public/images/character/rabbit.png",
//   score: 10,
// });

// // eslint-disable-next-line no-null/no-null
// export const userAtom = atom((get) => get(initUserAtom));

export const userAtom = atom<User | null>({
  id: 0,
  email: "test",
  nickname: "test",
  profile: "/public/images/character/rabbit.png",
  score: 10,
});
