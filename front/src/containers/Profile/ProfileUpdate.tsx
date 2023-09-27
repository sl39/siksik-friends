"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { serverAxios } from "@/services/api";
import { userAtom } from "@/store/userAtom";
import styles from "./Profile.module.scss";

export default function ProfileUpdate() {
  const router = useRouter();

  const [data, setData] = useAtom(userAtom);

  const [profile, setProfile] = useState(data.profile);
  const [nickname, setNickname] = useState(data.nickname);
  const [preNickname] = useState(data.nickname);

  const [checkNickname, setCheckNickname] = useState("");
  const [updateValidation, setUpdateValidation] = useState(true);

  /** 닉네임 유효성 */
  const onBlurNickname = (e: string) => {
    const getNickname = e;
    const trimmedNickname = getNickname?.trim().toString();
    const exp = getNickname.search("^[가-힣a-zA-Z0-9._ -]{2,}$");

    if (trimmedNickname.length <= 11 && trimmedNickname.length >= 1 && exp === 0) {
      console.log("비밀번호");
      setCheckNickname("");
      return true;
    }
    setCheckNickname("닉네임의 길이는 2자 이상 10자 이하입니다");
    return false;
  };

  /** 정보 수정 요청 */
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      nickname,
      profile,
    };

    try {
      await serverAxios.put(`/user/`, formData);
      setData((prevUser) => ({
        ...prevUser,
        ...formData,
      }));
      router.push(`/home/profile/${formData.nickname}/${data.user_id}`);
    } catch (error) {
      console.log("프로필 업데이트 에러", error);
    }
  };

  /** 닉네임 중복확인 */
  const handleCheckNickname = async () => {
    const params = {
      nickname,
    };
    if (nickname !== preNickname) {
      if (onBlurNickname(nickname)) {
        try {
          await serverAxios.get("/auth/nickname", { params });
          setCheckNickname("사용 가능한 닉네임입니다.");
          setUpdateValidation(false);
        } catch (error) {
          setCheckNickname("이미 존재하는 닉네임입니다.");
          setUpdateValidation(true);
        }
      } else {
        setUpdateValidation(true);
      }
    } else {
      setCheckNickname("기존 닉네임과 동일합니다");
      setUpdateValidation(false);
    }
  };

  return (
    <div className={styles.profileData}>
      <div className={`${styles.profileContainer} ${styles.updateContainer}`}>
        <div className={styles.title}>회원 정보 수정</div>
        <form onSubmit={handleUpdateProfile}>
          <div>{data.email}</div>

          {/* 프로필 업데이트 입력 필드 */}
          <div>
            <label htmlFor="profile">프로필 </label>
            <input type="text" id="profile" value={profile} onChange={(e) => setProfile(e.target.value)} />
          </div>

          {/* 닉네임 업데이트 입력 필드 */}
          <div>
            <label htmlFor="nickname">닉네임 </label>
            <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <button type="button" onClick={handleCheckNickname} className={[styles.button, styles.check].join(" ")}>
              중복확인
            </button>
            <div className={styles.checkText}>{checkNickname}</div>
          </div>

          <button type="submit" className={styles.button} disabled={updateValidation}>
            확인
          </button>
        </form>

        <button className={styles.button} onClick={() => router.back()}>
          취소
        </button>
      </div>
    </div>
  );
}
