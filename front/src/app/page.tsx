"use client";

import Login from "@/containers/Login/LoginModal";
import { fetchData } from "@/services/api";
import styles from "./page.module.css";

interface UserData {
  id: number;
}

const getUserData = async () => {
  try {
    const data = await fetchData<UserData>("/920/1", "GET");
    console.log(data.id);
  } catch (err) {
    console.log(err);
  }
};
getUserData();

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.Logo}>식식프렌즈 로고 가져오기</div>
      <Login />
    </div>
  );
}
