"use client";

import Image from "next/image";
// import { fetchData } from "@/services/api";
import styles from "./MyProfileCard.module.css";

// interface UserData {
//   id: number;
//   level: number;
//   name: string;
// }

export default function Profile() {
  // const [user, setUser] = useRecoilState(userAtom);
  // const getUserId = 1;
  // const getUserData = async () => {
  //   try {
  //     const data = await fetchData<UserData>(`/920/${getUserId}`, "GET");
  //     console.log(data.id);
  //     setUser(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.image}>
        <Image src="" alt="캐릭터 프로필" />
      </div>
      <div className={styles.nickname}>
        <span className={styles.level}>레벨</span>
        {닉네임}
      </div>
    </div>
  );
}
