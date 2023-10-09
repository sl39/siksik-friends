"use client";

import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import type { Article, History } from "@/types";
import styles from "./Profile.module.scss";

interface Props {
  data: History[];
}

export default function ProfileHistory({ data }: Props) {
  const [selectedItem, setSelectedItem] = useState<History>({});
  const [isSelected, setIsSelected] = useState(false);

  // 방 정보 자세히 보기
  const handleItemClick = (item: History) => {
    setSelectedItem(item);
    setIsSelected(!isSelected);
  };
  const handleBack = () => {
    setIsSelected(!isSelected);
    setSelectedItem({});
  };

  // 문제 하나 자세히 보기
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});
  const handleButtonClick = (articleTitle: string) => {
    setExpandedArticles((prevState) => ({
      ...prevState,
      [articleTitle]: !prevState[articleTitle],
    }));
  };

  // 문제 정답 맞추기
  const [articleAnswers, setArticleAnswers] = useState<{ [key: string]: string }>({});
  const [isAnswer, setIsAnswer] = useState<{ [key: string]: number }>({});
  // input 수정
  const handleInputChange = (articleTitle: string, value: string) => {
    setArticleAnswers((prevState) => ({
      ...prevState,
      [articleTitle]: value,
    }));

    setIsAnswer((prevState) => ({
      ...prevState,
      [articleTitle]: 0,
    }));
  };

  // 제출 버튼 클릭
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, article: Article) => {
    e.preventDefault();

    if (article.articleAnswer === articleAnswers[article.articleTitle]) {
      setIsAnswer((prevState) => ({ ...prevState, [article.articleTitle]: 1 }));
    } else {
      setIsAnswer((prevState) => ({ ...prevState, [article.articleTitle]: -1 }));
    }
  };

  return (
    <>
      {!isSelected && (
        <div className={styles.historyItems}>
          {data.map((item) => (
            <button key={item.historyId} className={styles.item} onClick={() => handleItemClick(item)}>
              <p className={styles.detailTitle}>{item.roomName}</p>
              <p className={styles.detailQuiz}>
                <span>[{item.category}] </span>
                <span>{item.articlesDate}</span>
              </p>
              <p className={styles.detailDate}>게임 플레이: {item.solvedDate}</p>
              {/* <p>당시 내 점수</p> */}
            </button>
          ))}
        </div>
      )}

      {isSelected && (
        <div className={styles.detail}>
          <button onClick={handleBack} className={styles.backBtn}>
            <IoMdArrowRoundBack size={36} />
          </button>

          <div className={styles.detailItem}>
            <div className={`${styles.detailRoom} ${styles.boxStyle}`}>
              <p className={styles.detailTitle}>{selectedItem.roomName}</p>
              <div>
                <span className={styles.detailQuiz}>
                  <span>[{selectedItem.category}] </span>
                  <span>{selectedItem.articlesDate}</span>
                </span>
                <span className={styles.solvedDate}>게임 플레이: {selectedItem.solvedDate}</span>
              </div>
            </div>

            <div className={styles.detailArticles}>
              {selectedItem.articles?.map((article, index) => (
                <div key={article.articleTitle} className={`${styles.boxContainer}`}>
                  <button
                    className={`${styles.boxStyle} ${styles.detailArticle}`}
                    onClick={() => handleButtonClick(article.articleTitle)}
                  >
                    {index + 1}. {article.articleTitle}
                  </button>

                  <div className={`${styles.content} ${expandedArticles[article.articleTitle] ? styles.open : ""}`}>
                    {expandedArticles[article.articleTitle] && (
                      <form onSubmit={(e) => handleSubmit(e, article)} className={`${styles.articleHint}`}>
                        {article.articleQuiz.map((hint) => (
                          <div key={hint} className={styles.hintText}>
                            {hint}
                          </div>
                        ))}
                        <div className={styles.inputBox}>
                          <input
                            type="text"
                            onChange={(e) => handleInputChange(article.articleTitle, e.target.value)}
                            className={`${styles.inputAnswer} ${
                              isAnswer[article.articleTitle] === 1 ? styles.isAnswer : ""
                            } ${isAnswer[article.articleTitle] === -1 ? styles.notAnswer : ""}`}
                          />
                          <button className={styles.BtnAnswer} type="submit">
                            제출
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
