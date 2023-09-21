"use client";
import styles from "@/app/page.module.scss";
import BackButton from "@/components/BackButton";
import LoginForm from "@/containers/SignUp/LoginForm";
import SignUpForm from "@/containers/SignUp/SignUpForm";
import { useState } from "react";

export default function Login() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.label}>
          <span>Log In</span>

          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
            type="checkbox"
            id="reg-log"
            name="reg-log"
          />
          <label htmlFor="reg-log"></label>
          <span>Sign Up</span>
        </div>

        <div className={styles.cardWrap}>
          <div className={`${styles.cardWrapper} ${isChecked ? styles.rotate : ""}`}>
            <div className={styles["card-front"]}>
              <div className={styles["center-wrap"]}>
                <LoginForm />
              </div>
            </div>
            <div className={styles["card-back"]}>
              <div className={styles["center-wrap"]}>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
        <BackButton className={[styles.button, styles.btnAct].join(" ")} />
      </div>
    </div>
  );
}
