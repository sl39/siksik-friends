"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { serverAxios } from "@/services/api";
import styles from "./game.module.scss";
import Modal from "@/components/gameModal";

export default function EnterRoom() {
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [openSearchRoom, setOpenSearchRoom] = useState(false);
  const [searchRoom, setSearchRoom] = useState("");
  const router = useRouter();

  /** 게임 방 ID로 방 정보를 조회하는 함수 */
  const handleSearchRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchRoom);

    try {
      const response = await serverAxios.get("/");
      console.log(response);
    } catch (err) {
      console.log("방 찾기 에러", err);
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    count: 0,
  });
  /** 게임 생성 */
  const handleCreateGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    /** 게임방 POST 요청 */
    try {
      const response = await serverAxios.post("/", formData);
      console.log(response);
      const id = 1;
      // 모달 종료 후 게임 방 입장
      setOpenCreateRoom(false);
      router.push(`/game/room/${id}`);
    } catch (err) {
      console.log(err);
      // Axios 연결 전 임시 데이터
      const id = 1;
      // 모달 종료 후 게임 방 입장
      setOpenCreateRoom(false);
      router.push(`/game/room/${id}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const { value } = e.target;
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <div>
        <button className={styles.boxButton}>빠른시작</button>
        <button className={styles.boxButton} onClick={() => setOpenSearchRoom(true)}>
          방 찾기
        </button>
        {openSearchRoom && (
          <Modal isOpen={openSearchRoom}>
            <div className={styles.modalContainer}>
              <h1>방찾기</h1>
              <form onSubmit={handleSearchRoom}>
                <label htmlFor="room">방코드</label>
                <input
                  type="text"
                  name="room"
                  id="room"
                  value={searchRoom}
                  onChange={(e) => setSearchRoom(e.target.value)}
                />
                <button type="submit">찾기</button>
              </form>
              <button onClick={() => setOpenSearchRoom(false)}>취소</button>
            </div>
          </Modal>
        )}
      </div>
      <div id="game-modal" className="z-99" />
      <button onClick={() => setOpenCreateRoom(true)} className={styles.boxButton}>
        방 만들기
      </button>
      {openCreateRoom && (
        <Modal isOpen={openCreateRoom}>
          <div className={styles.modalContainer}>
            <h1>방만들기</h1>
            <form onSubmit={handleCreateGame}>
              <label htmlFor="title">제목</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={(e) => handleChange(e)} />
              <label htmlFor="count">인원</label>
              <input type="number" name="count" id="count" value={formData.count} onChange={(e) => handleChange(e)} />
              <button type="submit">확인</button>
            </form>
            <button onClick={() => setOpenCreateRoom(false)}>취소</button>
          </div>
        </Modal>
      )}
    </>
  );
}
