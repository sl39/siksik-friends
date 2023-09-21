"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import styles from "./SignUp.module.scss";
import SignUpForm from "./SignUpForm";

export default function SwitchButton() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={`${styles.formWrapper} ${activeIndex === 0 ? `${styles.isActive}` : ""}`}>
        <button className={`${styles.switcher} ${styles.switcherLogin}`} onClick={() => setActiveIndex(0)}>
          로그인
          <span className={styles.underline} />
        </button>
        <fieldset>
          <legend>Please, enter your email, password and password confirmation for sign up.</legend>
          <LoginForm />
        </fieldset>
      </div>

      <div className={`${styles.formWrapper} ${activeIndex === 1 ? `${styles.isActive}` : ""}`}>
        <button className={`${styles.switcher}  ${styles.switcherSignUp}`} onClick={() => setActiveIndex(1)}>
          회원가입
          <span className={styles.underline} />
        </button>
        <fieldset>
          <legend>Please, enter your email, password and password confirmation for sign up.</legend>
          <SignUpForm />
        </fieldset>
      </div>
    </>
  );
}
