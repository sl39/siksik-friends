import { atom } from "jotai";
import { fetchData } from "@/services/api";

interface UserData {
  id: number;
  // level: number;
  // name: string;
}
const getUserId = 1;

const fetchUser = async () => {
  try {
    const data = await fetchData<UserData>(`/920/${getUserId}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const userAtom = atom<UserData | null>(
  {}, // 초기 상태
  async (get, set) => set(userAtom, await fetchUser()) // setter 부분에서 비동기 작업 수행
);

export default userAtom;
