import HomeIndex from "@/containers/home";
import { serverAxios } from "@/services/api";
import type { User } from "@/types";

export default function Home({ myData }: { myData: User }) {
  return <HomeIndex myData={myData} />;
}

export async function getServerSideProps() {
  let myData;

  try {
    const response = await serverAxios("/user");
    myData = response.data;
    console.log(response);
  } catch (err) {
    console.log("내 정보 가져오기 에러", err);

    // 더미 데이터
    myData = {
      id: 0,
      nickname: "dummy",
      level: 1,
      rank: 0,
    };
  }
  return { props: { myData } };
}
