"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { WordCloudAxios } from "@/services/api";
import styles from "./home.module.css";

const ZingChart: any = dynamic(() => import("zingchart").then((mod) => mod.ZingChart), { ssr: false });
interface Config {
  type: string;
  options: {
    words: any; // 'words'의 실제 타입으로 대체하세요.
    minLength: number;
    ignore: string[];
    maxItems: number;
    aspect: string;
    colorType: string;
    palette: string[];
  };
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
      borderRadius?: string;
      borderColor?: string;
    };
  };
}
export default function WordCloud() {
  // subpath: 101 경제 / 102 사회 / 103 생활문화 / 104 IT과학 / 105 세계
  const [path, setPath] = useState<number>(101);
  const [config, setConfig] = useState<Config | {}>({});

  const FetchData = async () => {
    try {
      const response = await WordCloudAxios.get(`/${path}`);
      console.log(response);
      const words = response.data;

      setConfig({
        type: "wordcloud",
        options: {
          words,
          minLength: 5,
          ignore: [""],
          maxItems: 40,
          aspect: "spiral",
          // rotate: true,
          colorType: "palette",
          palette: [
            "#D32F2F",
            "#5D4037",
            "#1976D2",
            "#E53935",
            "#6D4C41",
            "#1E88E5",
            "#F44336",
            "#795548",
            "#2196F3",
            "#EF5350",
            "#8D6E63",
            "#42A5F5",
          ],
        },
        style: {
          fontFamily: "Crete Round",
          hoverState: {
            backgroundColor: "#D32F2F",
            borderRadius: "2px",
            fontColor: "white",
          },
          tooltip: {
            text: "%text:%hits",
            visible: true,
            alpha: 0.9,
            backgroundColor: "#1976d2",
            borderRadius: "2px",
            borderColor: "none",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className={styles.wordCloud}>
      {/* <div>
        <button>경제</button>
        <button>사회</button>
        <button>생활/문화</button>
        <button>IT/과학</button>
        <button>세계</button>
      </div> */}
      {config && <ZingChart data={config} />}
    </div>
  );
}
