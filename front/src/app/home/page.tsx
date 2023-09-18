import HomeIndex from "@/containers/home";
import { userAtom } from "@/states/recoil";
import { fetchData } from "@/services/api";

// 메타데이터, 초기데이터만


export default function Home() {
  return <HomeIndex />;
}
