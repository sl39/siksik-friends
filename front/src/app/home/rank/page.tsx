import RankIndex from "@/containers/Rank";
import { serverAxios } from "@/services/api";
import { Rank } from "@/types";

export default function Rank({ data, ranks }) {
  return <RankIndex data={data} ranks={ranks} />;
}

/** 내 정보, 랭킹 정보 가져오기 */
export async function getServerSideProps() {
  let data;
  let ranks;

  try {
    const response = await serverAxios("/user");
    data = response.data;
    console.log(response);
  } catch (err) {
    console.log("내 정보 가져오기 에러", err);

    // 더미 데이터
    data = {
      id: 1,
      name: "me",
      level: 1,
      rank: 999,
    };
  }

  try {
    const rankResponse = await serverAxios("/auth/user/rank");
    ranks = rankResponse.data;
    console.log(rankResponse);
  } catch (err) {
    console.log("랭킹 정보 가져오기 에러", err);

    // 더미 데이터 or 기본값 설정
    ranks = {};
  }

  return { props: { data, ranks } };
}
