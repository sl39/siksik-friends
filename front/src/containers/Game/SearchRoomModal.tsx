"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./modal.module.scss";

interface Props {
  onClose: () => void;
}

export default function SearchRoomModal({ onClose }: Props) {
  const router = useRouter();
  const [searchRoom, setSearchRoom] = useState("");
  const [errRoom, setErrRoom] = useState("");

  /** 방 정보를 조회하는 함수
   *
   * 방장 ID? 방 ID?
   */
  const handleSearchRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = searchRoom;

    try {
      const response = await axios("방찾기요청");
      console.log(response);
      // 해당 방으로 이동한다.
      router.push(`/room/${roomId}`);
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
      <form onSubmit={(e) => handleSearchRoom(e)} className={`${styles.form}`}>
        <label className={styles.label} htmlFor="room">
          코드
        </label>
        <div className={styles.inputDiv}>
          <input
            className={`${styles.input} ${styles.inputText}`}
            type="text"
            name="room"
            id="room"
            value={searchRoom}
            onChange={(e) => setSearchRoom(e.target.value)}
            placeholder="0000"
          />
          <div className={styles.errMsg}>{errRoom}</div>
        </div>
        <button className={`${styles.btn}`} type="submit">
          찾기
        </button>
      </form>
      <button className={`${styles.button} ${styles.btn}`} onClick={onClose}>
        취소
      </button>
    </div>
  );
}
