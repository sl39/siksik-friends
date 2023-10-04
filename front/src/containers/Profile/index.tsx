"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { profileAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
import ProfileCard from "@/components/ProfileCard";
import UpdateButton from "./UpdateButton";
import styles from "./Profile.module.scss";

export default function Index() {
  const params = useParams();
  let userId = 0;
  if (typeof params.id === "string") {
    userId = parseInt(params.id, 10);
  }

  const [user, setUser] = useAtom(profileAtom);
  // atom 초기화
  const resetProfile = () => {
    setUser({});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverAxios(`/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.log("프로필 정보 에러", err);
      }
    };
    resetProfile();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.leftProfile}>
        <ProfileCard userProp={user} />
      </div>
      <div className={styles.buttonContainer}>
        <UpdateButton userPropId={userId} isMyShow />
      </div>
    </>
  );
}
