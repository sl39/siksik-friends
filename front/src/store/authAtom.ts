// import { atom, useAtom } from "jotai";
// import type { User } from "@/types";

// // auth 상태를 관리하는 atom
// const authAtom = atom<User | null>(null);

// // auth 상태를 갱신하는 atom (초기, 로그인, 로그아웃 시)
// const initAuthAtom = atom(null, async (get, set) => {
//   const token = {
//     access: sessionStorage.getItem("accessToken"),
//     refresh: localStorage.getItem("refreshToken"),
//   };

//   if (token.access) {
//     const authResponse = await getMe();
//     if (authResponse.data) return set(authAtom, authResponse.data);
//   }

//   if (token.refresh) {
//     const refreshResponse = await refreshAccessToken();
//     if (refreshResponse.accessToken) {
//       sessionStorage.setItem("accessToken", refreshResponse.accessToken);

//       const authResponse = await getMe();
//       if (authResponse.data) return set(authAtom, authResponse.data);
//     }
//   }

//   return set(authAtom, null);
// });

// // 사용하는 곳에서 쉽게 확인할 수 있게 hook으로 모았다.
// export const useAuthAtom = () => {
//   const [auth] = useAtom(authAtom);
//   const [, initAuth] = useAtom(initAuthAtom);

//   return { auth, initAuth };
// };
