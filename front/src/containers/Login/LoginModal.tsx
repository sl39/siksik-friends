"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Login.module.scss";
import Modal from "@/components/modal";
import LoginForm from "./LoginForm";

export default function LoginModal() {
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
      {/* 홈에서 보이는 로그인 버튼 */}
      <button onClick={handleOpenModal} className={[styles.start, styles.login].join(" ")}>
        <span>Click To Start</span>
      </button>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <div className={styles.container}>
            <div className={styles.title}>로그인</div>
            <LoginForm />

            <Link href="/sign-up">
              <div className={[styles.button, styles.btnAct].join(" ")}>회원가입</div>
            </Link>
            {/* <button className={styles.button}>카카오 로그인</button> */}

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
