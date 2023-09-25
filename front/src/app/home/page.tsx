// import axios from "axios";
import HomeIndex from "@/containers/home";
import { serverAxios } from "@/services/api";

export default async function Home() {
  // const res = await axios.get("https://jsonplaceholder.typicode.com/users/1", {
  //   headers: { "Cache-Control": "no-store" },
  // });
  try {
    const res = await serverAxios.get("/user/my-info");
    const { data } = res;
    console.log("------------------------------------------------");
    console.log(data);
  } catch (err) {
    console.log("------------------------------------------------");
    console.error("내 정보 에러");
  }

  return <HomeIndex />;
}
