"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { serverAxios } from "@/services/api";
import { ProfileImgAtom, userAtom } from "@/store/userAtom";
import styles from "./ProfileUpdate.module.scss";
import Image from "next/image";

export default function ProfileUpdate() {
  const router = useRouter();

  const [data, setData] = useAtom(userAtom);

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
      setCheckNickname("");
      return true;
    }
    setCheckNickname("닉네임의 길이는 2자 이상 10자 이하입니다");
    return false;
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

  const [profileImages] = useAtom(ProfileImgAtom);
  const [profileIndex, setProfileIndex] = useState(profileImages.indexOf(data.profile));

  /** 프로필 사진 변경 */
  const changeProfile = (direction: string) => {
    if (direction === "left") {
      setProfileIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : profileImages.length - 1));
    } else if (direction === "right") {
      setProfileIndex((prevIndex) => (prevIndex < profileImages.length - 1 ? prevIndex + 1 : 0));
    }
  };

  /** 정보 수정 요청 */
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      nickname,
      profile: profileImages[profileIndex],
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

  return (
    <div className={styles.profileData}>
      <div className={`${styles.updateContainer}`}>
        <div className={styles.title}>회원 정보 수정</div>
        <form className={styles.form} onSubmit={handleUpdateProfile}>
          {/* 프로필 사진 */}
          <div className={styles.flex}>
            <div className={styles.imageInput}>
              <input
                className={styles.inputImg}
                type="text"
                id="profile"
                value={profileImages[profileIndex]}
                readOnly
              />
              <button onClick={() => changeProfile("left")}>왼</button>
              <Image
                className={styles.imageSelect}
                src={profileImages[profileIndex]}
                alt="프로필 선택"
                quality={100}
                width={200}
                height={250}
              />
              <button onClick={() => changeProfile("right")}>오</button>
            </div>
            <div className={styles.col}>
              <div>
                <label htmlFor="email">이메일</label>
                <br />
                <input type="text" id="email" value={data.email} disabled />
              </div>
              <div>
                <label htmlFor="nickname">닉네임 </label>
                <br />
                <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <button type="button" onClick={handleCheckNickname} className={[styles.button, styles.check].join(" ")}>
                  중복확인
                </button>
              </div>
              <div className={styles.checkText}>{checkNickname}</div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.button} disabled={updateValidation}>
              수정
            </button>
            <button className={styles.button} onClick={() => router.back()}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
