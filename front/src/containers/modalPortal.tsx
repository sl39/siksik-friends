// 모달 여는 로직

"use client";

import { useState } from "react";
import Modal from "@/components/modal";

export default function Portal() {
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
      <button onClick={handleOpenModal} onKeyDown={handleOpenModal}>
        <h1>나와라 모달!</h1>
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
