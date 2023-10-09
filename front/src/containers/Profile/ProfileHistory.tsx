"use client";

import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Profile.module.scss";

interface Props {
  data: any[];
}

export default function ProfileHistory({ data }: Props) {
  const [selectedItem, setSelectedItem] = useState({
    historyId: 9,
    roomtitle: "방제목2",
    category: "경제",
    solvedDate: "문제 푼 날짜2",
    articlesDate: "기사 날짜2",
    articles: [
      {
        articleTitle: "제목",
        articleAnswer: "정답",
        articleQuiz: ["문제1", "문제2", "문제3", "문제4", "문제5"],
      },
    ],
  });
  const [isSelected, setIsSelected] = useState(true);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    console.log(item);
    setIsSelected(!isSelected);
  };
  const handleBack = () => {
    setIsSelected(!isSelected);
    // setSelectedItem({});
  };
  return (
    <>
      {!isSelected && (
        <div className={styles.historyItems}>
          {data.map((item) => (
            <button key={item} className={styles.item} onClick={() => handleItemClick(item)}>
              <p>{item.roomtitle}</p>
              <p>{item.category}</p>
              <p>{item.articlesDate}</p>
              <p>{item.solvedDate}</p>
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
            <div className={`${styles.detailRoom} ${styles.boxStyle}`}>{selectedItem.roomtitle}</div>
            <div>문제정보</div>
          </div>
        </div>
      )}
    </>
  );
}
