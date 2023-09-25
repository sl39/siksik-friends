"use client";

import { useParams, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { serverAxios } from "@/services/api";
import { userAtom } from "@/store/userAtom";
import styles from "./Profile.module.css";

interface TypeTextType {
  [key: number]: string[];
}

export default function UpdateButton() {
  const router = useRouter();

  const params = useParams();
  console.log(typeof parseInt(params.params[1], 10));
  const userId = parseInt(params.params[1], 10);

  const myData = useAtom(userAtom)[0];
  console.log(myData);
  const myId = myData.user_id;

  /** * 친구인지, 아닌지 상태 확인하기
   * 1. 내가 걔한테 요청을 보냈고, 아직 친구가 아니다.
   * (친구 요청 취소(1) -> 친구 요청(3))
   * 2. 걔가 나에게 요청을 보냈고, 아직 친구가 아니다.
   * (친구 요청 수락(2) -> 친구 삭제(4) / 친구 요청 거절(2) -> 친구 요청(3))
   * 3. 둘 다 요청을 안보냈다
   * (친구 요청(3) -> 친구 요청 취소(1))
   * 4. 친구다
   * (친구 삭제 버튼(4) -> 친구 요청(3))
   */
  const [userType, setUserType] = useState(0);

  const TypeText: TypeTextType = {
    1: ["친구 요청 취소"],
    2: ["친구 요청 수락", "친구 요청 거절"],
    3: ["친구 요청"],
    4: ["친구 삭제"],
  };

  useEffect(() => {
    /** 친구 상태 확인 */
    const isFriend = async () => {
      try {
        const response = await serverAxios(`/user/friend/${userId}`);
        console.log(response);
        console.log(typeof response.data?.status);
        setUserType(response.data.status);
      } catch (err) {
        console.log("친구 확인 에러", err);
      }
    };
    isFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFriend = async () => {
    // 친구 아님 -> 친구 요청
    if (userType === 3) {
      try {
        await serverAxios.post(`/user/friend/${userId}`);
      } catch (err) {
        console.log("친구 요청 에러", err);
      }
    }
  };

  /** 정보 수정 페이지로 이동 */
  const handleUpdate = () => {
    router.push(`/home/profile/update`);
  };
  /** 로그아웃 */
  const handleLogout = async () => {
    try {
      await serverAxios("/user/sign-out");
      router.push("/");
    } catch (err) {
      console.log("로그아웃 에러", err);
    }
  };

  // 내 프로필
  if (myId === userId) {
    return (
      <>
        <button onClick={handleUpdate} className={styles.button}>
          <span className={styles.buttonText}>정보 수정</span>
        </button>
        <button onClick={handleLogout} className={styles.button}>
          <span className={styles.buttonText}>로그아웃</span>
        </button>
      </>
    );
  }

  // 상대 프로필
  return (
    <>
      {TypeText[userType].map((text) => (
        <button key={text} className={styles.button} onClick={handleFriend}>
          <span className={styles.buttonText}>{text}</span>
        </button>
      ))}
    </>
  );
}
