"use client";

import { useState } from "react";

import styles from "./game.module.scss";
import Modal from "@/components/gameModal";

export default function EnterRoom() {
  const [isOpen, setIsOpen] = useState(false);

  /** 모달 활성화 */
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  /** 모달 비활성화 */
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <button className={styles.boxButton}>빠른시작</button>
        <button className={styles.boxButton}>방 찾기</button>
      </div>
      <div id="game-modal" className="z-99"></div>
      <button onClick={handleOpenModal} className={styles.boxButton}>
        방 만들기
      </button>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <h2>(children임) 여기에 넣고싶은 내용 넣기</h2>
          <button onClick={handleCloseModal}>Close modal</button>
        </Modal>
      )}
    </>
  );
}
