import { atom } from "jotai";
import type { User } from "@/types";

// eslint-disable-next-line no-null/no-null
export const userAtom = atom<User | null>({
  id: 1,
  email: "test",
  nickname: "test",
  profile: "",
  score: 10,
});
