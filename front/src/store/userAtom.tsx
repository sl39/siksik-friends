import { atom } from "jotai";
import type { User } from "@/types";
// import { fetchData } from "@/services/api";

// /** localStorage에 'user' 키의 데이터가 있으면 JSON.parse를 사용하여 객체로 변환한 후 반환 */
// function getSavedUser() {
//   if (typeof window === "undefined") {
//     // 서버 환경에서는 null 반환
//     return null;
//   }
//   const savedUser = localStorage.getItem("user");
//   return savedUser ? JSON.parse(savedUser) : null;
// }
// export const localUser = atom({
//   key: "localUser", // unique ID (with respect to other atoms/selectors)
//   default: getSavedUser(),
// });

export const userAtom = atom<User | null>({
  id: 1,
  email: "temp",
  nickname: "temp",
  profile: "/images/character/rabbit.png",
});
