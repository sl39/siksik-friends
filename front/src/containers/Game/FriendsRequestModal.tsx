"use client";

import { useEffect, useState } from "react";
import { serverAxios } from "@/services/api";
import styles from "./modal.module.scss";

interface Props {
  onClose: () => void;
}
export default function FriendsRequest({ onClose }: Props) {
  const [myResponse, setMyResponse] = useState([]);
  const [myRequest, setMyRequest] = useState([]);

  const fetchResponse = async () => {
    try {
      const response = await serverAxios("/user/friend/response");
      console.log(response);
      setMyResponse(response.data);
      console.log(myResponse);
    } catch (err) {
      console.log("요청 목록 조회", err);
    }
  };
  const fetchRequest = async () => {
    try {
      const response = await serverAxios("/user/friend/request");
      console.log(response);
      setMyRequest(response.data);
      console.log(myRequest);
    } catch (err) {
      console.log("요청 받은 목록 조회", err);
    }
  };

  useEffect(() => {
    fetchResponse();
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div>내가 한 요청 목록</div>
      <div>내가 받은 요청 목록</div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}
