"use client";

import Image from "next/image";
// import { useUpdateAtom } from "jotai";
// import userAtom from "@/store/userAtom";
import styles from "./MyProfileCard.module.css";

export default function Profile() {
  // const [user] = useUpdateAtom(userAtom);

  // useEffect(() => {
  //   setUser(fetchUser());
  // }, []);

  // if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.image}>
        <Image src="" alt="캐릭터 프로필" />
      </div>
      <div className={styles.nickname}>
        <span className={styles.level}>레벨</span>
        닉네임
      </div>
    </div>
  );
}
