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
  const [checkPassword1, setCheckPassword1] = useState("");
  const [checkPassword2, setCheckPassword2] = useState("");

  const [emailValidation, setEmailValidation] = useState(0);
  const [passwordValidation, setPasswordValidation] = useState(0);
  const [nicknameValidation, setNicknameValidation] = useState(0);

  /** 회원가입 POST */
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("회원가입 버튼");
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
    console.log("이메일 버튼");
    const params = {
      email,
    };
    try {
      const response = await serverAxios.get("/auth/email", { params });
      console.log(response);
      setEmailValidation(2);
      setCheckEmail("사용 가능한 이메일입니다.");
    } catch (error) {
      setEmailValidation(0);
      setCheckEmail("이미 존재하는 이메일입니다.");
    }
  };
  /** 닉네임 중복 검사 */
  const handleCheckNickname = async () => {
    console.log("닉네임 버튼");
    const params = {
      nickname,
    };
    try {
      const response = await serverAxios.get("/auth/nickname", { params });
      console.log(response);
      setNicknameValidation(2);
      setCheckNickname("사용 가능한 닉네임입니다.");
    } catch (error) {
      setNicknameValidation(0);
      setCheckNickname("이미 존재하는 닉네임입니다.");
    }
  };
  const OnBlurSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getEmail = e.target.value;
    // const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const exptext = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;

    if (exptext.test(getEmail) === false) {
      setCheckEmail("이메일 형식이 올바르지 않습니다");
      setEmailValidation(0);
      return false;
    }
    if (getEmail.length > 320) {
      setCheckEmail("이메일 길이가 깁니다");
      setEmailValidation(0);
      return false;
    }
    setCheckEmail("");
    setEmailValidation(1);
    return true;
  };
  const onBlurPassWord1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/gi);
    const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password.length < 8 || password.length > 20) {
      setPasswordValidation(0);
      setCheckPassword1("8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    }
    if (password.search(/\s/) !== -1) {
      setCheckPassword1("비밀번호는 공백 없이 입력해주세요.");
      setPasswordValidation(0);

      return false;
    }
    if (num < 0 || eng < 0 || spe < 0) {
      setCheckPassword1("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      setPasswordValidation(0);

      return false;
    }
    setCheckPassword1("");
    setPasswordValidation(1);

    return true;
  };

  const onBlurPassWord2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkPassword = e.target.value;
    if (checkPassword === password1) {
      setCheckPassword2("");
      setPasswordValidation(2);

      return true;
    }

    setCheckPassword2("비밀번호가 일치하지 않습니다");
    setPasswordValidation(1);
    return false;
  };

  const onBlurNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getNickname = e.target.value;
    const trimmedNickname = getNickname?.trim().toString();
    const exp = getNickname.search("^[가-힣a-zA-Z0-9._ -]{2,}$");

    if (trimmedNickname.length <= 11 && trimmedNickname.length >= 1 && exp === 0) {
      console.log("비밀번호");
      setCheckNickname("");
      setNicknameValidation(1);
      return true;
    }
    setCheckNickname("닉네임의 길이는 2자 이상 10자 이하입니다");
    setNicknameValidation(0);
    return false;
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
            onBlur={(e) => OnBlurSignUp(e)}
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            disabled={emailValidation !== 1}
            className={[styles.button, styles.check].join(" ")}
          >
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
            onBlur={(e) => onBlurPassWord1(e)}
          />
          <button type="button" onClick={() => setShowPassword1(!showPassword1)}>
            view
          </button>
        </div>
        <div className={styles.checkText}>{checkPassword1}</div>
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
            onBlur={(e) => onBlurPassWord2(e)}
          />
          <button type="button" onClick={() => setShowPassword2(!showPassword2)}>
            view
          </button>
        </div>
        <div className={styles.checkText}>{checkPassword2}</div>
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
            onBlur={(e) => onBlurNickname(e)}
          />
          <button
            type="button"
            onClick={handleCheckNickname}
            disabled={nicknameValidation !== 1}
            className={[styles.button, styles.check].join(" ")}
          >
            중복확인
          </button>
        </div>
        <div className={styles.checkText}>{checkNickname}</div>
      </div>

      <button
        type="submit"
        disabled={!(emailValidation === 2 && passwordValidation === 2 && nicknameValidation === 2)}
        className={[styles.button, styles.btnAct].join(" ")}
      >
        회원가입
      </button>
    </form>
  );
}
