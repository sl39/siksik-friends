"use client";

import { useEffect, useState } from "react";
import zingchart from "zingchart/es6";
// eslint-disable-next-line import/extensions
import "zingchart/modules-es6/zingchart-wordcloud.min.js";
import { serverAxios } from "@/services/api";
import styles from "./home.module.scss";

interface Config {
  type: string;
  backgroundColor?: string;
  options?: {
    words?: any;
    minLength?: number;
    ignore?: string[];
    maxItems?: number;
    aspect?: string;
    colorType?: string;
    palette?: string[];
    active?: boolean;
    minFontSize?: number;
    maxFontSize?: number;
    style?: {
      fontFamily?: string;
      hoverState?: {
        backgroundColor?: string;
        borderRadius?: string;
        fontColor?: string;
      };
      tooltip?: {
        text?: string;
        visible?: boolean;
        alpha?: number;
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontColor: string;
        fontFamily: string;
        fontSize: number;
        fontWeight: string;
        lineStyle: string;
        textAlpha: number;
      };
    };
  };
}
export default function WordCloud() {
  // subpath: 101 경제 / 102 사회 / 103 생활문화 / 104 세계 / 105 IT/과학
  const [path, setPath] = useState<number>(101);
  const [config, setConfig] = useState<Config | undefined>();
  const style = {
    fontFamily: "SUITE-Regular",
    hoverState: {
      borderRadius: "2px",
      fontColor: "#007BA7",
    },
    tooltip: {
      text: "%text: %hits",
      visible: true,
      alpha: 0.9,
      backgroundColor: "#89CFF0",
      borderColor: "#7EF9FF",
      borderRadius: 2,
      borderWidth: 2,
      fontColor: "#007BA7",
      fontFamily: "Georgia",
      fontSize: 15,
      fontWeight: "strong",
      lineStyle: "dashdot",
      textAlpha: 1,
    },
  };
  const palette = [
    "#87CEEB",
    "#D4AF37",
    "#8B4513",
    "#FF007F",
    "#006400",
    "#FF0000",
    "#FFD700",
    "#800080",
    "#008000",
    "#FFB6C1",
    "#008B8B",
  ];

  const fetchWord = async (newPath: number) => {
    try {
      const response = await serverAxios.get(`/user/word-cloud/${newPath}`);
      const words = response.data;
      setConfig({
        type: "wordcloud",
        backgroundColor: "rgba(255, 255, 255, 0)",
        options: {
          words,
          minLength: 1,
          ignore: [""],
          maxItems: 50,
          aspect: "spiral",
          colorType: "palette",
          palette,
          style,
        },
      });
    } catch (error) {
      console.log(error);
      const words = [
        { text: "앨리스", count: 25 },
        { text: "이상한나라", count: 18 },
        { text: "토끼", count: 20 },
        { text: "체셔고양이", count: 15 },
        { text: "하트여왕", count: 10 },
        { text: "광대모자", count: 12 },
        { text: "찻잔파티", count: 7 },
        { text: "트윌들딤과 트윌들덤", count: 5 },
        { text: "애벌레", count: 9 },
        { text: "공작부인", count: 6 },
        { text: "도도새", count: 8 },
        { text: "몽땅털이", count: 13 },
        { text: "자두주스", count: 16 },
        { text: "거울나라", count: 19 },
        { text: "타임", count: 14 },
        { text: "장미꽃", count: 17 },
        { text: "카드병정", count: 11 },
        { text: "엘리어스학교", count: 7 },
        { text: "잠자는도로새", count: 6 },
        { text: "쿼드릴춤", count: 5 },
        { text: "백조요트경주", count: 4 },
        { text: "가짜거북왕님의서신전달인", count: 3 },
      ];

      setConfig({
        type: "wordcloud",
        backgroundColor: "rgba(255, 255, 255, 0)",
        options: {
          words,
          minLength: 1,
          ignore: [""],
          maxItems: 50,
          aspect: "spiral",
          colorType: "palette",
          palette,
          style,
        },
      });
    }
  };

  /** 버튼을 누르고, window가 뜨면, wordCloud 변경  */
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchWord(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  /** window가 뜨면 render */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (config !== undefined) {
        zingchart.render({
          id: "myChart",
          data: config,
          height: "90%",
          width: "100%",
        });
      }
    }
  }, [config]);

  return (
    <>
      <div className={styles.groupContainer}>
        <div className={styles.wordButton}>
          <button
            onClick={() => setPath(101)}
            className={path === 101 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            경제
          </button>
          <button
            onClick={() => setPath(102)}
            className={path === 102 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            사회
          </button>
          <button
            onClick={() => setPath(103)}
            className={path === 103 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            생활/문화
          </button>
          <button
            onClick={() => setPath(104)}
            className={path === 104 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            세계
          </button>
          <button
            onClick={() => setPath(105)}
            className={path === 105 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            IT/과학
          </button>
        </div>
      </div>
      <div id="myChart" className={styles.wordChart} />
    </>
  );
}
