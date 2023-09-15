"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

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
        <div className={styles.back} />
        <div className={styles.ModalBody}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>,
      document.getElementById("modal-root") as Element
    );
  }
  return undefined;
}
