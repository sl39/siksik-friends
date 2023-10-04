import { useState } from "react";
import Image from "next/image";
import styles from "./play.module.scss";

interface Props {
  data?: any;
}

// const quiz = {
//   type: "경제",
//   title: "문제 제목",
//   description: "문제 주절주절",
//   answer: "이건 정답",
// };

export default function Question({ data }: Props) {
  const [myAnswer, setMyAnswer] = useState("");
  /** 정답 제출 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(myAnswer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyAnswer(e.target.value);
  };

  return (
    <div className={styles.quizContainer}>
      <div className={`${styles.backImage} z-9`}>
        <Image src="/images/backclock.png" alt="" sizes="10vw" fill objectFit="contain" />
      </div>
      {data ? <div className={`${styles.quizTitle} z-10`}>[{data.quizType}]</div> : "Start"}
      {/* eslint-disable-next-line no-null/no-null */}
      {data ? <div className={`${styles.quizDesc} z-10`}>{data.question}</div> : null}
      <form onSubmit={handleSubmit} className={`${styles.answer} z-10`}>
        <div className={styles.quote}>
          <input type="text" value={myAnswer} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
}
