"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { serverAxios } from "@/services/api";
import { ProfileImgAtom, userAtom } from "@/store/userAtom";
import styles from "./ProfileUpdate.module.scss";

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
  const changeProfile = (dir: string) => {
    if (dir === "left") {
      setProfileIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : profileImages.length - 1));
    } else if (dir === "right") {
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
      await setData((prevUser) => ({
        ...prevUser,
        ...formData,
      }));
      router.replace(`/home/profile/${data.user_id}`);
    } catch (error) {
      console.log("프로필 업데이트 에러", error);
    }
  };

  return (
    <div className={styles.profileData}>
      <div className={`${styles.updateContainer}`}>
        <div className={styles.title}>회원 정보 수정</div>
        <form className={styles.form} onSubmit={handleUpdateProfile}>
          <div className={styles.flex}>
            {/* 프로필 사진 */}
            <div className={styles.imageInput}>
              <input
                className={styles.inputImg}
                type="text"
                id="profile"
                value={profileImages[profileIndex]}
                readOnly
              />
              <button type="button" onClick={() => changeProfile("left")}>
                <BsChevronLeft />
              </button>
              <div style={{ overflow: "hidden" }}>
                <Image
                  className={`${styles.imageSelect} `}
                  src={profileImages[profileIndex]}
                  alt="프로필 선택"
                  quality={100}
                  width={200}
                  height={250}
                />
              </div>
              <button type="button" onClick={() => changeProfile("right")}>
                <BsChevronRight />
              </button>
            </div>

            <div className={styles.col}>
              <div className={styles.inputBox}>
                <label htmlFor="email" className={styles.details}>
                  이메일
                </label>
                <div className={styles.input}>
                  <input type="text" id="email" value={data.email} disabled />
                </div>
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="nickname" className={styles.details}>
                  닉네임
                </label>
                <div className={styles.input}>
                  <input
                    autoComplete="off"
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleCheckNickname}
                    className={[styles.button, styles.check].join(" ")}
                  >
                    중복확인
                  </button>
                </div>
                <div className={styles.checkText}>{checkNickname}</div>
              </div>

              {/* <div className={styles.inputBox}>
                <label htmlFor="password1" className={styles.details}>
                  비밀번호
                </label>
                <input type="text" id="password1" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="password2" className={styles.details}>
                  비밀번호 확인
                </label>
                <input type="text" id="password2" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div> */}
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.button} disabled={updateValidation}>
              수정
            </button>
            <button type="button" className={styles.button} onClick={() => router.back()}>
              취소
            </button>
          </div>
          {/* <div className={styles.deleteUser}>회원 탈퇴</div> */}
        </form>
      </div>
    </div>
  );
}
