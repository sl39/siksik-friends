"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { serverAxios } from "@/services/api";
import styles from "./form.module.scss";

// const validate = (vaules) => {
//   const error = {};

//   // 이름
//   if (!values.name) {
//     errors.name = "이름을 입력해주세요.";
//     return errors;
//   }
//   if (!/^[가-힣a-zA-Z]+$/.test(values.name)) {
//     errors.name = "이름은 한글 또는 영어로만 입력해주세요.";
//     return errors;
//   }
//   // 닉네임
//   if (!values.nickname) {
//     errors.nickname = "닉네임을 입력해주세요.";
//   } else if (values.nickname.length < 2 || values.nickname.length > 5) {
//     errors.nickname = "닉네임은 2~5자로 작성해주세요.";
//   } else if (!/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,5}$/.test(values.nickname)) {
//     errors.nickname = "닉네임에는 한글, 영어, 숫자만 사용할 수 있습니다.";
//   }
//   return errors;
// };

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");

  const router = useRouter();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // 유효성 검사
  // const [errors, setErrors] = useState(() => validate(values));
  // useEffect(() => {
  //   setErrors(validate(values));
  // }, [values]);
  // const handleFieldChange = (e) => {
  //   handleChange(e);
  //   const { name, value } = e.target;
  //   const newErrors = validate({ ...values, [name]: value });
  //   setErrors(newErrors);
  // };
  // // 유효성 검사 후 다음버튼 활성화
  // const inputStyle = (fieldName) => {
  //   if (errors[fieldName] !== undefined) {
  //     return `${classes.inputBox} ${classes.inputError}`;
  //   }
  //   if (values[fieldName] !== "") {
  //     return `${classes.inputBox} ${classes.inputFilled}`;
  //   }
  //   return classes.inputBox;
  // };

  const [checkEmail, setCheckEmail] = useState("");
  const [checkNickname, setCheckNickname] = useState("");

  /** 회원가입 POST */
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email,
      password: password1,
      nickname,
      profile: "",
    };

    try {
      const response = await serverAxios.post("/auth/sign-up", formData);
      console.log(response);

      // 로그인 시키고 홈으로 에러
      await serverAxios.post("/auth/sign-in", formData);
      router.push("/home");
    } catch (error) {
      console.log("회원가입 에러", error);
    }
    // }
  };

  /** 이메일 중복 검사 */
  const handleCheckEmail = async () => {
    const params = {
      email,
    };
    try {
      const response = await serverAxios.get("/email", { params });
      console.log(response);
      setCheckEmail("사용 가능한 이메일입니다.");
    } catch (error) {
      setCheckEmail("이미 존재하는 이메일입니다.");
    }
  };
  /** 닉네임 중복 검사 */
  const handleCheckNickname = async () => {
    const params = {
      nickname,
    };
    try {
      const response = await serverAxios.get("/nickname", { params });
      console.log(response);
      setCheckNickname("사용 가능한 닉네임입니다.");
    } catch (error) {
      setCheckNickname("이미 존재하는 닉네임입니다.");
    }
  };

  return (
    <form onSubmit={handleSignUp} className={styles.form}>
      <h1 className={styles.formTitle}>회원가입</h1>
      <div className={`${styles["form-group"]} ${styles.mb}`}>
        <div className={styles.formCheck}>
          <input
            className={styles["form-style"]}
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button type="button" onClick={handleCheckEmail} className={[styles.button, styles.check].join(" ")}>
            중복확인
          </button>
        </div>
        <div className={styles.checkText}>{checkEmail}</div>
      </div>

      <div className={`${styles["form-group"]} ${styles.mb}`}>
        <div>
          <input
            className={styles["form-style"]}
            type={showPassword1 ? "text" : "password"}
            id="password1"
            value={password1}
            placeholder="비밀번호"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword1(!showPassword1)}>
            view
          </button>
        </div>
      </div>
      <div className={`${styles["form-group"]} ${styles.mb}`}>
        <div>
          <input
            className={styles["form-style"]}
            type={showPassword2 ? "text" : "password"}
            id="password2"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword2(!showPassword2)}>
            view
          </button>
        </div>
      </div>

      <div className={`${styles["form-group"]} ${styles.mb}`}>
        <div className={styles.formCheck}>
          <input
            placeholder="닉네임"
            className={styles["form-style"]}
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="button" onClick={handleCheckNickname} className={[styles.button, styles.check].join(" ")}>
            중복확인
          </button>
        </div>
        <div className={styles.checkText}>{checkNickname}</div>
      </div>

      <button type="submit" className={[styles.button, styles.btnAct].join(" ")}>
        회원가입
      </button>
    </form>
  );
}
