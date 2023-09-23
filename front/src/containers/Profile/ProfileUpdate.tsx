"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { serverAxios } from "@/services/api";
import styles from "./Profile.module.css";

export default function ProfileUpdate() {
  const router = useRouter();

  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState("");
  const [preNickname, setPreNickname] = useState("");
  // const [preProfile, setPreProfile] = useState("");
  const [checkNickname, setCheckNickname] = useState("");
  const [updateValidation, setUpdateValidation] = useState(true);
  const FetchData = async () => {
    try {
      const response = await serverAxios(`/user/userinfo/1`);
      // const response = await serverAxios(`/user/userinfo/${userid}`);
      console.log(response);
      setPreNickname(response.data.nickname);
      // setPreProfile(response.profile);
      setProfile(response.data.profile);
      setNickname(response.data.nickname);
    } catch (err) {
      console.log("유저 정보 에러", err);
      setPreNickname("test");
      // setPreProfile("profile.png");
      setProfile("profile.png");
      setNickname("test");
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

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

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      nickname,
      profile,
    };

    try {
      // await serverAxios.put(`/user/userinfo/${userid}`, formData);
      await serverAxios.put(`/user/userinfo/1`, formData);

      console.log(formData);
      router.push(`/user/userinfo/1`);
    } catch (error) {
      console.log("프로필 업데이트 에러", error);
    }
  };
  const handleCheckNickname = async () => {
    console.log("닉네임 버튼");
    const params = {
      nickname,
    };
    if (nickname !== preNickname) {
      if (onBlurNickname(nickname)) {
        try {
          await serverAxios.get("/auth/nickname", { params });
          setCheckNickname("사용 가능한 닉네임입니다.");
          setUpdateValidation(false);
          console.log("통과!!!");
        } catch (error) {
          setCheckNickname("이미 존재하는 닉네임입니다.");
          setUpdateValidation(true);
          console.log("실패!!!");
        }
      } else {
        setUpdateValidation(true);
        console.log("실패!!!");
      }
    } else {
      setCheckNickname("기존 닉네임과 동일합니다");
      setUpdateValidation(false);
      console.log("통과!!!");
    }
  };

  return (
    <div className={styles.profileData}>
      <form onSubmit={handleUpdateProfile}>
        {/* 프로필 업데이트 입력 필드 */}
        <div>
          <label htmlFor="profile">프로필 </label>
          <input type="text" id="profile" value={profile} onChange={(e) => setProfile(e.target.value)} />
        </div>

        {/* 닉네임 업데이트 입력 필드 */}
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <button type="button" onClick={handleCheckNickname} className={[styles.button, styles.check].join(" ")}>
          중복확인
        </button>
        <div className={styles.checkText}>{checkNickname}</div>

        <button type="submit" disabled={updateValidation}>
          프로필 업데이트
        </button>
      </form>
    </div>
  );
}
