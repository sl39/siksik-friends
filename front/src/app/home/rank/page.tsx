import RankIndex from "@/containers/Rank";
// import { serverAxios } from "@/services/api";
// import type { Rank } from "@/types";

export default function RankPage() {
  return <RankIndex />;
}

/** 전체 랭킹 정보 가져오기 */
// export async function getServerSideProps() {
//   let ranks;

//   try {
//     const rankResponse = await serverAxios("/auth/user/rank");
//     ranks = rankResponse.data;
//     console.log(rankResponse);
//   } catch (err) {
//     console.log("랭킹 정보 가져오기 에러", err);

//     // 더미 데이터 or 기본값 설정
//     ranks = {};
//   }

//   return { props: { ranks } };
// }
