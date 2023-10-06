"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import type { SoketUser, User } from "@/types";
import { serverAxios } from "@/services/api";
import { convertSoketUserToUser, convertUserToSoketUser } from "@/utils/userConversion";
import { friendsAtom, notFriendsAtom, userAtom } from "@/store/userAtom";
import styles from "./game.module.scss";
import Modal from "@/components/gameModal";
import SimpleProfileModal from "./SimpleProfileModal";

interface Props {
  dataProp: any;
  isRoom?: boolean;
  isTab?: boolean;
}

interface TypeTextType {
  [key: number]: string[];
}

// Type Guard 함수
function isUser(dataProp?: SoketUser | User): dataProp is User {
  return (dataProp as User)?.user_id !== undefined;
}

export default function UserItem({ dataProp, isRoom = false, isTab = true }: Props) {
  const data = isUser(dataProp) ? convertUserToSoketUser(dataProp) : dataProp;

  /** 간단한 프로필 모달 열기 */
  const [openProfile, setOpenProfile] = useState(false);

  const [isActive, setIsActive] = useState(false);

  /** data.user_id 로 친구 여부에 따른 버튼 */
  const TypeText: TypeTextType = {
    0: [],
    1: ["요청 취소"],
    2: ["요청 수락", "거절"],
    3: ["친구 요청"],
    4: ["친구 삭제"],
  };
  const [userType, setUserType] = useState(0);

  /** 친구 상태 확인 */
  useEffect(() => {
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

  const [friends, setFriends] = useAtom(friendsAtom);
  const [NotFriends, setNotFriends] = useAtom(notFriendsAtom);

  /** 친구 요청 | 삭제 */
  const handleFriend = async (type: number, text: string) => {
    let newFriends;
    if (type === 3) {
      // 친구 요청
      try {
        await serverAxios.post(`/user/friend/${data.userId}`);
        setUserType(1);
      } catch (err) {
        console.log("친구 요청 에러", err);
      }
    } else if (type === 4 || type === 1) {
      // 친구 삭제, 친구 요청 취소
      try {
        await serverAxios.delete(`user/friend/${data.userId}`);
        // 친구 목록에서 삭제
        newFriends = await friends.filter((item) => item.user_id !== data.userId);
        setFriends(newFriends);
        setUserType(3);
      } catch (err) {
        console.log("친구 삭제 | 취소 에러", err);
      }
    } else if (type === 2) {
      if (text === "요청 수락") {
        // 친구 수락
        try {
          await serverAxios.put(`user/friend/${data.userId}`);
          // 요청 목록에서 삭제
          newFriends = await NotFriends.filter((item) => item.user_id !== data.userId);
          setNotFriends(newFriends);
          setUserType(4);
        } catch (err) {
          console.log("친구 수락 에러", err);
        }
      } else if (text === "거절") {
        // 친구 삭제
        try {
          await serverAxios.delete(`user/friend/${data.userId}`);
          // 요청 목록에서 삭제
          newFriends = await NotFriends.filter((item) => item.user_id !== data.userId);
          setNotFriends(newFriends);
          setUserType(3);
        } catch (err) {
          console.log("친구 거절 에러", err);
        }
      }
    }
  };

  let status;
  if (data.leader) {
    status = "방장";
  } else if (data.ready) {
    status = "READY";
  } else {
    status = "WAIT";
  }

  return (
    <div
      className={`${styles.userItem} ${styles.friend} ${isActive ? styles.active : ""}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={styles.profile}>
        <Image
          src={data?.profile || "/images/character/rabbit.png"}
          alt="프로필"
          fill
          sizes="20vw"
          style={{
            objectFit: "contain",
          }}
          priority
          quality={100}
        />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.userInfo}>
          <div className={`${styles.subBox} ${styles.level}`}>Lv. {data.level}</div>
          <div className={`${styles.subBox} ${styles.name}`}>{data.userName}</div>
          {isRoom && <div className={`${styles.subBox} ${styles.isReader}`}>{status}</div>}
        </div>
        <div className={`${styles.hiddenBtn} ${isActive ? styles.visible : ""}`}>
          <button className={`${styles.subBtn} ${styles.highlight}`} onClick={() => setOpenProfile(true)}>
            프로필
          </button>
          <Modal isOpen={openProfile}>
            <SimpleProfileModal user={convertSoketUserToUser(data)} onClose={() => setOpenProfile(false)} />
          </Modal>

          {data.userId !== useAtom(userAtom)[0].user_id && isTab && (
            <>
              {TypeText[userType].map((text) => (
                <button
                  key={text}
                  className={`${styles.subBtn} ${styles.highlight}`}
                  onClick={() => handleFriend(userType, text)}
                >
                  <span className={styles.buttonText}>{text}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
