"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Login.module.css";
import Modal from "@/components/modal";
import LoginForm from "./LoginForm";

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
      <button onClick={handleOpenModal} className={styles.login}>
        로그인
      </button>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <div className={styles.container}>
            <div className={styles.title}>로그인</div>
            <LoginForm />

            <Link href="/sign-up">
              <div>회원가입</div>
            </Link>
            <div>카카오 로그인</div>
            {/* 닫기 버튼 로고로 바꿔야함 */}
            <button onClick={handleCloseModal} className={styles.closeButton}>
              X
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
