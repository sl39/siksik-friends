"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./modal.module.scss";

interface Props {
  onClose: () => void;
}

export default function SearchRoomModal({ onClose }: Props) {
  const [searchRoom, setSearchRoom] = useState("");
  const [errRoom, setErrRoom] = useState("");

  /** 방 정보를 조회하는 함수
   *
   * 방장 ID? 방 ID?
   */
  const handleSearchRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios("방찾기요청");
      console.log(response);
      // 해당 방으로 이동한다.
    } catch (err) {
      console.log("방 찾기 에러", err);
      setErrRoom("해당 방 정보가 없습니다.");
    }
  };

  return (
    <div className={`${styles.modalContainer} ${styles.searchModal}`}>
      <div className={styles.modalImg}>
        <Image src="/images/characterInFigma/image_178.png" alt="방 찾기 캐릭터" fill priority quality={100} />
      </div>
      <div className={styles.searchText}>방 코드를 입력하세요</div>
      <form onSubmit={handleSearchRoom} className={`${styles.form}`}>
        <input
          className={`${styles.input} ${styles.inputText}`}
          type="text"
          name="room"
          id="room"
          value={searchRoom}
          onChange={(e) => setSearchRoom(e.target.value)}
        />
        <div className={styles.errMsg}>{errRoom}</div>
        <button className={styles.button} type="submit">
          찾기
        </button>
      </form>
      <button className={styles.button} onClick={onClose}>
        취소
      </button>
    </div>
  );
}
