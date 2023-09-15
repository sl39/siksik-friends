"use client";
import styles from "./modal.module.css";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function Modal({ children, isOpen }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isOpen && isBrowser) {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className={styles.back}></div>
        <div className={styles.ModalBody}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>,
      document.getElementById("modal-root") as Element
    );
  } else {
    return null;
  }
}
