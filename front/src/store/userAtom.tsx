import { atom } from "jotai";
import type { User } from "@/types";
// import { fetchData } from "@/services/api";

// 아톰 선언
export const userAtom = atom<User | null>({
  id: 1,
  name: "닉네임",
  level: 1,
  profile: "/images/character/rabbit.png",
});

// const fetchUser = async () => {
//   try {
//     const data = await fetchData<UserData>(`/920/${getUserId}`, "GET");
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
