"use client";

import { useEffect, useState } from "react";
import { serverAxios } from "@/services/api";
import styles from "./modal.module.scss";

interface Props {
  onClose: () => void;
}
export default function FriendsList({ onClose }: Props) {
  const [myFriends, setMyFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const response = await serverAxios("/user/friend/list");
      console.log(response);
      setMyFriends(response.data);
    } catch (err) {
      console.log("친구 목록 조회 에러", err);
    }
  };
  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div>{myFriends}</div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}
