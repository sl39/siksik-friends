import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import type { Answer } from "@/types";
import { userAtom } from "@/store/userAtom";
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
  const { quiz, isQuiz, isResult } = data;
  const user = userAtom.init;
  const params = useParams();
  const roomId = Number(params.id);
  const [submitAnswer, setSubmitAnswer] = useState("");

  const [myAnswer, setMyAnswer] = useState<Answer>({
    roomId,
    userId: user.user_id!,
    userAnswer: "",
    answer: quiz?.answer,
  });
  useEffect(() => {
    // quiz 값이 변경될 때 실행
    if (quiz) {
      setMyAnswer({ ...myAnswer, answer: quiz.answer });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  /** 정답 제출 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const response = await serverAxios.post("/", formData);
      const response = await axios
        .create({
          baseURL: "https://j9e101.p.ssafy.io/socket",
          // headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        })
        .post("/score", myAnswer);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    console.log(myAnswer, "답이 전달 됐나");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitAnswer(e.target.value);
    setMyAnswer({ ...myAnswer, userAnswer: e.target.value });
  };

  return (
    <div className={styles.quizContainer}>
      <div className={`${styles.backImage} z-9`}>
        <Image src="/images/backclock.png" alt="" sizes="10vw" fill objectFit="contain" />
      </div>
      {isQuiz && isResult === false ? (
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>[{quiz.quizType}]</div> : "Start"}
          {/* eslint-disable-next-line no-null/no-null */}
          {quiz ? <div className={`${styles.quizDesc} z-10`}>{quiz.question}</div> : null}
        </>
      ) : (
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>[정답]</div> : "Start"}
          {/* eslint-disable-next-line no-null/no-null */}
          {quiz ? <div className={`${styles.quizDesc} z-10`}>{quiz.answer}</div> : null}
        </>
      )}
      <form onSubmit={handleSubmit} className={`${styles.answer} z-10`}>
        <div className={styles.quote}>
          <input type="text" value={submitAnswer} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
}
