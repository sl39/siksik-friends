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
   * 방장 ID 또는 방 ID로 방 정보를 찾음
   * 방이 있으면, 해당 방으로 이동
   * 방이 없다면, 에러 메세지
   */
  const handleSearchRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = searchRoom;
    try {
      const response = await axios("방 찾기 요청");
      console.log(response);
      // 해당 방으로 이동한다.
      router.push(`/room/${roomId}`);
    } catch (err) {
      console.log("방 찾기 에러", err);
      setErrRoom("해당 방 정보가 없습니다.");
    }
  };

  return (
    <div className={styles.searchModal}>
      <div className={styles.modalImg}>
        <Image
          src="/images/actor/cat1.png"
          alt="방 찾기 캐릭터"
          fill
          style={{
            objectFit: "contain",
          }}
          priority
          quality={100}
        />
      </div>
      <div className={`${styles.modalContainer}`}>
        <form onSubmit={handleSearchRoom} className={`${styles.form}`}>
          <div className={styles.subText}>방 찾기</div>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="room">
              코드
            </label>
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
          <div className={styles.btns}>
            <button className={`${styles.btn}`} type="submit">
              찾기
            </button>
            <button type="button" className={`${styles.btn}`} onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
