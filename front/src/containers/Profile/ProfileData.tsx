"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { serverAxios } from "@/services/api";
import styles from "./Profile.module.scss";

export default function ProfileData() {
  const params = useParams();
  console.log(params);
  // const userNickname = params[0];

  // 프로필 데이터를 가져오는 함수
  const FetchData = async () => {
    try {
      const response = await serverAxios(`/user/my-info`);
      console.log(response);
    } catch (err) {
      console.log("유저 정보 에러", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className={styles.profileData}>
      <div>
        프로필 정보 보여주기
        {/* {userNickname} */}
      </div>
    </div>
  );
}
