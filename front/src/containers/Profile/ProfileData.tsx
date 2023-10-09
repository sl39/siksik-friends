"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { profileAtom } from "@/store/userAtom";
import { serverAxios, socketAxios } from "@/services/api";
import type { User } from "@/types";
import styles from "./Profile.module.scss";
import Stat from "./Stat";
// import FriendsTab from "./FriendsTab";

interface Props {
  userId?: number;
}
interface QuizData {
  economyCorrectQuizCount: number;
  economySolvedQuizCount: number;
  socialCorrectQuizCount: number;
  socialSolvedQuizCount: number;
  livingCorrectQuizCount: number;
  livingSolvedQuizCount: number;
  globalCorrectQuizCount: number;
  globalSolvedQuizCount: number;
  scienceCorrectQuizCount: number;
  scienceSolvedQuizCount: number;
  allCorrectQuizCount: number;
  allSolvedQuizCount: number;
}
interface ResponseData extends QuizData {
  allHistory: any[];
}

type Coordinate = [number, number];
interface StepData {
  [key: number]: Coordinate;
}
interface DataXY {
  [key: number]: StepData;
}
type QuizCount = {
  correct: number;
  solved: number;
};

export default function ProfileData({ userId }: Props) {
  const [profileData, setProfileData] = useState<User>({});
  const [defaultData, setDefaultData] = useAtom(profileAtom);

  const params = useParams();

  useEffect(() => {
    const profileId = params.id;
    const profileUser = async () => {
      try {
        const response = await serverAxios(`/user/${profileId}`);
        setDefaultData(response.data);
      } catch (err) {
        console.error("Params 없는 프로필 조회", err);
      }
    };
    if (defaultData.user_id === 0) {
      profileUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await serverAxios(`/user/${userId}`);
        setProfileData(response.data);
      } catch (err) {
        console.error("프로필 에러", err);
      }
    };
    if (userId) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // data는 userId가 있는 경우 profileData를 사용
  const data = userId ? profileData : defaultData;
  const fetchId = userId || params.id;

  // type History = {
  //   historyId: number;
  //   articles: string[];
  // };
  // const [historyItems, setHistoryItems] = useState<Array<History>>([]);

  const [statCount, setStatCount] = useState({
    economyCorrectQuizCount: 0,
    economySolvedQuizCount: 0,
    socialCorrectQuizCount: 0,
    socialSolvedQuizCount: 0,
    livingCorrectQuizCount: 0,
    livingSolvedQuizCount: 0,
    globalCorrectQuizCount: 0,
    globalSolvedQuizCount: 0,
    scienceCorrectQuizCount: 0,
    scienceSolvedQuizCount: 0,
    allCorrectQuizCount: 0,
    allSolvedQuizCount: 0,
  });

  useEffect(() => {
    // 전적 데이터
    const fetchHistory = async () => {
      try {
        const response = await socketAxios.post<ResponseData>("/history", {
          userId: fetchId,
        });
        // setHistoryItems(response.data.allHistory);
        setStatCount({
          economyCorrectQuizCount: response.data.economyCorrectQuizCount,
          economySolvedQuizCount: response.data.economySolvedQuizCount,
          socialCorrectQuizCount: response.data.socialCorrectQuizCount,
          socialSolvedQuizCount: response.data.socialSolvedQuizCount,
          livingCorrectQuizCount: response.data.livingCorrectQuizCount,
          livingSolvedQuizCount: response.data.livingSolvedQuizCount,
          globalCorrectQuizCount: response.data.globalCorrectQuizCount,
          globalSolvedQuizCount: response.data.globalSolvedQuizCount,
          scienceCorrectQuizCount: response.data.scienceCorrectQuizCount,
          scienceSolvedQuizCount: response.data.scienceSolvedQuizCount,
          allCorrectQuizCount: response.data.allCorrectQuizCount,
          allSolvedQuizCount: response.data.allSolvedQuizCount,
        });
      } catch (err) {
        console.error("히스토리 에러", err);
      }
    };
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const dataXY: DataXY = {
    1: {
      5: [209.29, 130.65],
      4: [209, 154.16],
      3: [209.28, 185.31],
      2: [209.28, 209.7],
      1: [209.3, 233.44],
    },
    2: {
      5: [106.14, 190.21],
      4: [126.97, 201.52],
      3: [152.45, 218.14],
      2: [173.56, 230.34],
      1: [194.7, 241.88],
    },
    3: {
      5: [106.14, 309.33],
      4: [126.97, 296.33],
      3: [152.45, 283.78],
      2: [173.56, 271.6],
      1: [194.7, 258.73],
    },
    4: {
      5: [209.29, 368.89],
      4: [209, 343.61],
      3: [209.28, 316.6],
      2: [209.28, 292.21],
      1: [209.3, 267.16],
    },
    5: {
      5: [312.46, 309.33],
      4: [291.03, 296.23],
      3: [266.13, 283.78],
      2: [245, 271.6],
      1: [223.9, 258.73],
    },
    6: {
      5: [312.46, 190.21],
      4: [291.03, 201.52],
      3: [266.13, 218.14],
      2: [245, 230.34],
      1: [223.9, 241.88],
    },
  };
  /** 승률: 맞춘 문제(Correct) / 푼 문제(Solved)
   *  0.2 단위로, 1 2 3 4 5 단계 찍기
   * 1단계: 0, 0.1, 0.2,
   * 2단계: 0.3, 0.4
   * 3단계: 0.5, 0.6
   * 4단계: 0.7, 0.8
   * 5단계: 0.9, 1
   */

  const calculateStep = ({ correct, solved }: QuizCount): number => {
    // 푼 문제가 없음
    if (solved === 0) return 1;
    const winRate = correct / solved;

    if (winRate <= 0.2) return 1;
    if (winRate <= 0.4) return 2;
    if (winRate <= 0.6) return 3;
    if (winRate <= 0.8) return 4;
    return 5;
  };

  // 경제, 사회, 생활/문화, 세계, IT/과학, 종합
  const [x1, y1] =
    dataXY[1][calculateStep({ correct: statCount.economyCorrectQuizCount, solved: statCount.economySolvedQuizCount })];
  const [x2, y2] =
    dataXY[2][calculateStep({ correct: statCount.socialCorrectQuizCount, solved: statCount.socialSolvedQuizCount })];
  const [x3, y3] =
    dataXY[3][calculateStep({ correct: statCount.livingCorrectQuizCount, solved: statCount.livingSolvedQuizCount })];
  const [x4, y4] =
    dataXY[4][calculateStep({ correct: statCount.globalCorrectQuizCount, solved: statCount.globalSolvedQuizCount })];
  const [x5, y5] =
    dataXY[5][calculateStep({ correct: statCount.scienceCorrectQuizCount, solved: statCount.scienceSolvedQuizCount })];
  const [x6, y6] =
    dataXY[6][calculateStep({ correct: statCount.allCorrectQuizCount, solved: statCount.allSolvedQuizCount })];

  const d = `M${x1} ${y1}l${x2 - x1} ${y2 - y1} ${x3 - x2} ${y3 - y2} ${x4 - x3} ${y4 - y3} ${x5 - x4} ${y5 - y4} ${
    x6 - x5
  } ${y6 - y5} ${x1 - x6} ${y1 - y6}z`;

  const badgeImg = [
    { image: "/images/actor/alice1.png", isGet: false },
    { image: "/images/actor/alice2.png", isGet: false },
    { image: "/images/actor/card.png", isGet: false },
    { image: "/images/actor/cat1.png", isGet: false },
    { image: "/images/actor/dodo1.png", isGet: false },
    { image: "/images/actor/queen.png", isGet: false },
    { image: "/images/actor/rabbit1.png", isGet: false },
  ];

  return (
    <div className={styles.profileData}>
      <section id="wrapper" className={styles.profileContainer}>
        <div className={styles.content}>
          {/* tab */}
          <div className={styles.tabs}>
            <button
              onClick={() => handleTabClick(1)}
              className={`${styles.tablinks} ${activeTab === 1 ? styles.active : ""}`}
            >
              <p>정보</p>
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={`${styles.tablinks} ${activeTab === 2 ? styles.active : ""}`}
            >
              <p>데이터</p>
            </button>
            {/* {userId === undefined && (
              <button
                onClick={() => handleTabClick(3)}
                className={`${styles.tablinks} ${activeTab === 3 ? styles.active : ""}`}
              >
                <p>친구</p>
              </button>
            )} */}
          </div>

          <div className={`${styles.wrapper_tabcontent}`}>
            <div className={`${styles.tabcontent} ${activeTab === 1 ? styles.active : ""}`}>
              <h3>정보</h3>
              <div className={`${styles.p}`}>
                <div className={styles.myData}>
                  <div className={styles.item}>
                    <div className={styles.itemContent}>{data.nickname}</div>
                  </div>
                  <div className={styles.item}>
                    <div>Lv. </div>
                    <div>{data.level}</div>
                  </div>
                  <div className={styles.item}>
                    <div>종합</div>
                    <div>{data.rank} 등</div>
                  </div>
                </div>
                <div className={styles.badge}>
                  <div className={styles.item}>
                    <div>뱃지</div>
                  </div>
                  <div className={styles.ImgContainer}>
                    {badgeImg.map((item) => (
                      <div className={`${styles.imgItem} ${item.isGet ? styles.itemGet : ""}`} key={item.image}>
                        <Image src={item.image} alt="뱃지" sizes="30vw" fill style={{ objectFit: "contain" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${styles.tabcontent} ${activeTab === 2 ? styles.active : ""} ${
                userId !== undefined ? styles.noFlow : ""
              }`}
            >
              <h3>데이터</h3>
              <div className={`${styles.p} ${styles.data}`}>
                {userId === undefined ? (
                  <>
                    <Stat d={d} />
                    <div className={styles.items}>
                      <div className={`${styles.item} ${styles.titleItem}`}>맞춘 문제 / 푼 문제</div>
                      <div className={`${styles.item} ${styles.quizCount}`}>
                        <span>종합</span>{" "}
                        <span className={styles.countcount}>
                          {statCount.allCorrectQuizCount}/{statCount.allSolvedQuizCount}
                        </span>
                      </div>
                      <div className={`${styles.item} ${styles.quizCount}`}>
                        <span>경제</span>{" "}
                        <span className={styles.countcount}>
                          {statCount.economyCorrectQuizCount}/{statCount.economySolvedQuizCount}
                        </span>
                      </div>
                      <div className={`${styles.item} ${styles.quizCount}`}>
                        <span>사회</span>{" "}
                        <span className={styles.countcount}>
                          {statCount.socialCorrectQuizCount}/{statCount.socialSolvedQuizCount}
                        </span>
                      </div>
                      <div className={`${styles.item} ${styles.quizCount}`}>
                        <span>생활/문화</span>{" "}
                        <span className={styles.countcount}>
                          {statCount.livingCorrectQuizCount}/{statCount.livingSolvedQuizCount}
                        </span>
                      </div>
                      <div className={`${styles.item} ${styles.quizCount}`}>
                        <span>세계</span>{" "}
                        <span className={styles.countcount}>
                          {statCount.globalCorrectQuizCount}/{statCount.globalSolvedQuizCount}
                        </span>
                      </div>

                      <div className={`${styles.item} ${styles.quizCount}`}>
                        <span>IT/과학</span>{" "}
                        <span className={styles.countcount}>
                          {statCount.scienceCorrectQuizCount}/{statCount.scienceSolvedQuizCount}
                        </span>
                      </div>
                    </div>
                    {/* <div className={styles.items}>
                      {historyItems.map((item) => (
                        <div key={item.historyId!} className={styles.item}>
                          {item.historyId} 번 id 의 전적 관련 데이터
                        </div>
                      ))}
                    </div> */}
                  </>
                ) : (
                  <Stat d={d} statStyle />
                )}
              </div>
            </div>

            <div className={`${styles.tabcontent} ${activeTab === 3 ? styles.active : ""}`}>
              <h3>친구</h3>
              <div className={`${styles.p} `}>{/* <FriendsTab /> */}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
