import { atom } from "jotai";
import type { User } from "@/types";
// import { fetchData } from "@/services/api";

/** localStorage에 'user' 키의 데이터가 있으면 JSON.parse를 사용하여 객체로 변환한 후 반환 */
function getSavedUser(): User | null {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : undefined;
}
export const userAtom = atom<User | null>(getSavedUser());

// const userAtom = atom(getSavedUser());

// const fetchUser = async () => {
//   try {
//     const data = await fetchData<UserData>(`/920/${getUserId}`, "GET");
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
