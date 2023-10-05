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

export default function Question({ data, isDone }: Props) {
  const { quiz, isQuiz, isResult } = data;
  const [user] = useAtom(userAtom);
  const params = useParams();
  const roomId = Number(params.id);
  const [submitAnswer, setSubmitAnswer] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
      setIsSubmit(false);
      setIsCorrect(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    if (isResult) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
      setSubmitAnswer("");
    }
  }, [isResult]);

  useEffect(() => {
    if (isDone) {
      setSubmitAnswer("");
    }
  }, [isDone]);

  /** 정답 제출 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await socketAxios.post("/score", myAnswer);
      setIsSubmit(true);
      // 정답 여부
      if (myAnswer.answer === myAnswer.userAnswer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
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
<<<<<<< HEAD
          {quiz ? (
            <div className={`${styles.quizDesc} z-10`}>
              아래 빈칸을 채워주세요! <br />
              {quiz.question.title}
              <br />
              <ol>
                {quiz.question.hints.map((item: any) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
=======
          {quiz ? <div className={`${styles.quizDesc} z-10`}>{quiz.question.title}</div> : undefined}
          {quiz ? (
            <div className={`${styles.quizDesc} z-10`}>
              {quiz.question.hints.map((hint) => {
                <div>{hint}</div>;
              })}
>>>>>>> 81e860a0781473aa668b81bfd305c3910acf0973
            </div>
          ) : undefined}
        </>
      ) : isDone ? (
        // 퀴즈 끝
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>게임 끝!</div> : "Start"}
          {quiz ? (
            <div className={`${styles.quizDesc} ${styles.Isanswer} z-10`}>잠시 후 최종 결과가 공개됩니다</div>
          ) : undefined}
        </>
      ) : (
        // 정답
        <>
          {quiz ? <div className={`${styles.quizTitle} z-10`}>[정답]{quiz.answer}</div> : "Start"}
          {quiz ? (
            <div className={`${styles.quizDesc} ${styles.Isanswer}  z-10`}>{isCorrect ? "정답" : "오답"}</div>
          ) : undefined}
        </>
      )}
      <form onSubmit={handleSubmit} className={`${styles.answer} z-10`}>
        <div className={styles.quote}>
          <input
            disabled={isSubmit}
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
