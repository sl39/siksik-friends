import { serverAxios } from "@/services/api";
import AllRank from "./AllRank";
import MyRank from "./MyRank";
import styles from "./Rank.module.css";
import MyProfileCard from "@/components/MyProfileCard";

export default function index({ data = { rank: 11 } }) {
  return (
    <>
      <div className={styles.left}>
        <div className={styles.profile}>
          <MyProfileCard />
        </div>
        <div className={styles.RankDiv}>
          <MyRank rank={data.rank} />
        </div>
      </div>
      {/* <div className={styles.right}>
        <AllRank />
      </div> */}
    </>
  );
}

/** 내 정보 가져오기 */
export async function getServerSideProps() {
  try {
    const response = await serverAxios("/");
    const ranks = await serverAxios("/auth/user/rank");
    console.log(response);
    return {
      props: {
        data: response.data,
      },
    };
  } catch (err) {
    console.log("내 정보 가져오기 에러", err);
    // 더미 데이터
    return {
      props: {
        data: {
          id: 1,
          name: "me",
          level: 1,
          rank: 999,
        },
      },
    };
  }
}
