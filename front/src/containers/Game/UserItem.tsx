"use client";

import { useEffect, useRef, useState } from "react";
import type { SoketUser } from "@/types";
import { serverAxios } from "@/services/api";
import styles from "./game.module.scss";

interface Props {
  data: SoketUser;
}

interface TypeTextType {
  [key: number]: string[];
}

export default function UserItem({ data }: Props) {
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  // eslint-disable-next-line no-null/no-null
  const buttonRef = useRef<HTMLDivElement>(null);

  // const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
  //   // e.relatedTarget이 buttonRef.current 또는 그 자식 요소인지 확인
  //   if (buttonRef.current && !buttonRef.current.contains(e.relatedTarget as Node)) {
  //     setIsActive(false);
  //   }
  // };

  /** 간단한 프로필 모달 열기 */
  const openProfile = () => {
    console.log(1);
  };

  /** data.user_id 로 친구 여부에 따른 버튼 */
  // const TypeText: TypeTextType = {
  //   0: [],
  //   1: ["요청 취소"],
  //   2: ["요청 수락", "거절"],
  //   3: ["친구 요청"],
  //   4: ["친구 삭제"],
  // };
  const [userType, setUserType] = useState(0);

  useEffect(() => {
    /** 친구 상태 확인 */
    const isFriend = async () => {
      try {
        const response = await serverAxios(`/user/friend/${data.userId}`);
        setUserType(response.data.status);
      } catch (err) {
        console.log("친구 확인 에러", err);
      }
    };
    isFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 친구 요청 | 삭제 */
  // const handleFriend = async (text: string) => {
  //   if (userType === 3) {
  //     // 친구 요청
  //     try {
  //       await serverAxios.post(`/user/friend/${data.userId}`);
  //       setUserType(1);
  //     } catch (err) {
  //       console.log("친구 요청 에러", err);
  //     }
  //   } else if (userType === 4 || userType === 1) {
  //     // 친구 삭제, 친구 요청 취소
  //     try {
  //       await serverAxios.delete(`user/friend/${data.userId}`);
  //       setUserType(3);
  //     } catch (err) {
  //       console.log("친구 삭제 | 취소 에러", err);
  //     }
  //   } else if (userType === 2) {
  //     if (text === "친구 요청 수락") {
  //       // 친구 수락
  //       try {
  //         await serverAxios.put(`user/friend/${data.userId}`);
  //         setUserType(4);
  //       } catch (err) {
  //         console.log("친구 수락 에러", err);
  //       }
  //     } else if (text === "친구 요청 거절") {
  //       // 친구 삭제
  //       try {
  //         await serverAxios.delete(`user/friend/${data.userId}`);
  //         setUserType(3);
  //       } catch (err) {
  //         console.log("친구 거절 에러", err);
  //       }
  //     }
  //   }
  // };

  return (
    <div className={styles.userItem}>
      {/* <Image
        className={styles.profile}
        src={data?.profile || "/images/character/rabbit.png"}
        alt="프로필"
        fill
        sizes="50%"
        priority
        quality={100}
      /> */}
      <div className={`${styles.subBox} ${styles.level}`}>{data.userRanking} 위</div>
      <div className={`${styles.subBox} ${styles.name}`}>{data.userName}</div>
    </div>
  );
}
