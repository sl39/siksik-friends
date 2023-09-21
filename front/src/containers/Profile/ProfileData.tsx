import { serverAxios } from "@/services/api";
import styles from "./Profile.module.css";
import { useEffect } from "react";

export default function ProfileData() {
  // 내 프로필 데이터를 가져오는 함수
  const FetchData = async () => {
    try {
      const response = await serverAxios(`/`);
    } catch (err) {
      console.log("유저 정보 에러", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className={styles.profileData}>
      <div>내 프로필 정보 보여주기</div>
    </div>
  );
}
