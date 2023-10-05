import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import type { Answer } from "@/types";
import { userAtom } from "@/store/userAtom";
import { socketAxios } from "@/services/api";
import styles from "./play.module.scss";

interface Props {
  data?: any;
  isDone?: boolean;
}

// const quiz = {
//   type: "경제",
//   title: "문제 제목",
//   description: "문제 주절주절",
//   answer: "이건 정답",
// };

export default function Question({ data, isDone }: Props) {
  const { quiz, isQuiz, isResult } = data;
  const [user] = useAtom(userAtom);
  const params = useParams();
  const roomId = Number(params.id);
  const [submitAnswer, setSubmitAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

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
      const response = await socketAxios.post("/score", myAnswer);
      console.log("r", response);
      setIsSubmit(true);
      console.log(isSubmit);
    } catch (err) {
      console.error("정답 전달", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitAnswer(e.target.value);
    setMyAnswer({ ...myAnswer, userAnswer: e.target.value });
  };

  return (
    <div className={styles.quizContainer}>
      <div className={`${styles.backImage} z-9`}>
        <Image src="/images/backclock.png" alt="" sizes="30vw" fill style={{ objectFit: "contain" }} priority />
      </div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isQuiz && isResult === false ? (
        // 문제
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>[{quiz.quizType}]</div> : "Start"}
          {/* eslint-disable-next-line no-null/no-null */}
          {quiz ? <div className={`${styles.quizDesc} z-10`}>{quiz.question}</div> : null}
        </>
      ) : isDone ? (
        // 퀴즈 끝
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>게임 끝!</div> : "Start"}
          {/* eslint-disable-next-line no-null/no-null */}
          {quiz ? <div className={`${styles.quizDesc} z-10`}>잠시 후 최종 결과가 공개됩니다</div> : null}
        </>
      ) : (
        // 정답
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>[정답]</div> : "Start"}
          {/* eslint-disable-next-line no-null/no-null */}
          {quiz ? <div className={`${styles.quizDesc} z-10`}>{quiz.answer}</div> : null}
        </>
      )}
      <form onSubmit={handleSubmit} className={`${styles.answer} z-10`}>
        <div className={styles.quote}>
          <input
            className={`${isSubmit ? styles.isSubmit : ""}`}
            type="text"
            value={submitAnswer}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
