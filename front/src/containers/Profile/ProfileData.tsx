"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { profileAtom } from "@/store/userAtom";
import { serverAxios, socketAxios } from "@/services/api";
import type { User } from "@/types";
import styles from "./Profile.module.scss";
// import FriendsTab from "./FriendsTab";

interface Props {
  userId?: number;
}

export default function ProfileData({ userId }: Props) {
  const [profileData, setProfileData] = useState<User>({});
  const [defaultData, setDefaultData] = useAtom(profileAtom);

  const params = useParams();
  useEffect(() => {
    const profileId = params.id;
    const profileUser = async () => {
      try {
        const resposne = await serverAxios(`/user/${profileId}`);
        setDefaultData(resposne.data);
      } catch (err) {
        console.error("프로필 다시 에러", err);
      }
    };
    if (defaultData.user_id === 0) {
      profileUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    try {
      const resposne = await serverAxios(`/user/${userId}`);
      setProfileData(resposne.data);
    } catch (err) {
      console.error("프로필 에러", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // data는 userId가 있는 경우 profileData를 사용
  const data = userId ? profileData : defaultData;

  // 전적 데이터
  const fetchHistory = async () => {
    try {
      const response = await socketAxios.post("/history", {
        userId: data.user_id,
      });
      console.log("히스토리", response);
    } catch (err) {
      console.error("히스토리 에러", err);
    }
  };

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    fetchHistory();
  };

  const dataXY = {
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

  // 경제, 사회, 생활/문화, 세계, IT/과학, 종합
  const [x1, y1] = dataXY[1][5];
  const [x2, y2] = dataXY[2][5];
  const [x3, y3] = dataXY[3][2];
  const [x4, y4] = dataXY[4][3];
  const [x5, y5] = dataXY[5][4];
  const [x6, y6] = dataXY[6][5];

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
              <div className={`${styles.p} `}>
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

            <div className={`${styles.tabcontent} ${activeTab === 2 ? styles.active : ""}`}>
              <h3>데이터</h3>
              <div className={`${styles.p} ${styles.data}`}>
                <div className={styles.stat}>
                  <svg className={styles["design-tool"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 80 420 340">
                    <g>
                      <g className={styles.text} opacity=".87" fill="#333" fontWeight="300">
                        <text className="tool-illustrator" transform="translate(190.31 114.99)">
                          경제
                        </text>
                        <text className="tool-sketch" transform="translate(50.7 193.74)">
                          사회
                        </text>
                        <text className="tool-invision" transform="translate(17.09 316.94)">
                          생활/문화
                        </text>
                        <text className="tool-indesign" transform="translate(190.11 402.93)">
                          세계
                        </text>
                        <text transform="translate(320.09 323.06)">IT/과학</text>
                        <text transform="translate(326.68 185.19)">종합</text>
                      </g>

                      <g className={styles.chart} fill="none" stroke="#333" strokeMiterlimit="10">
                        <path
                          className="hexagon"
                          opacity=".8"
                          d="M106.14 309.33V190.21l103.15-59.56 103.17 59.56v119.12l-103.17 59.56-103.15-59.56z"
                        />
                        <path
                          className="hexagon-2"
                          opacity=".4"
                          strokeDasharray="2"
                          d="M291.03 296.23L209 343.61l-82.03-47.38v-94.71L209 154.16l82.03 47.36v94.71z"
                        />
                        <path
                          className="hexagon-3"
                          opacity=".4"
                          strokeDasharray="2"
                          d="M152.45 283.78v-65.64l56.83-32.83 56.85 32.83v65.64l-56.85 32.82-56.83-32.82z"
                        />
                        <path
                          className="hexagon-4"
                          opacity=".4"
                          strokeDasharray="2"
                          d="M173.56 271.6v-41.26l35.72-20.64L245 230.34v41.26l-35.72 20.61-35.72-20.61z"
                        />
                        <path
                          className="hexagon-5"
                          opacity=".4"
                          strokeDasharray="2"
                          d="M194.7 258.73v-16.85l14.6-8.44 14.6 8.44v16.85l-14.6 8.43-14.6-8.43z"
                        />
                        <path className="bar-1" opacity=".4" strokeDasharray="2" d="M312.45 190.21l-88.55 51.67" />
                        <path className="bar-2" opacity=".4" strokeDasharray="2" d="M194.7 241.88l-88.57-51.67" />
                        <path className="bar-3" opacity=".4" strokeDasharray="2" d="M194.7 258.73l-88.57 50.6" />
                        <path className="bar-4" opacity=".4" strokeDasharray="2" d="M223.9 258.73l88.55 50.6" />
                        <path className="bar-5" opacity=".4" strokeDasharray="2" d="M209.3 267.16l-.02 101.73" />
                        <path className="bar-6" opacity=".4" strokeDasharray="2" d="M209.3 130.65l-.02 102.79" />
                      </g>

                      <g className={styles.numbers} opacity=".3" fill="#333">
                        <path d="M298.75 252.92l.73-1a2.2 2.2 0 0 0 1.52.71 1.06 1.06 0 0 0 1.18-.93 1 1 0 0 0 0-.17 1 1 0 0 0-.95-1.09h-.17a1.61 1.61 0 0 0-1 .35l-.73-.48.21-3.58h4v1.37h-2.69l-.13 1.34a1.7 1.7 0 0 1 .8-.17 2.08 2.08 0 0 1 2.24 1.9 1.61 1.61 0 0 1 0 .31 2.43 2.43 0 0 1-2.38 2.48h-.22a3.35 3.35 0 0 1-2.41-1.04z" />
                        <path d="M279.77 251v-4.17h-2.08l-2.58 4.17v1.12h3.06l.08 1.81h1.52v-1.68h.82V251zm-1.6-1.27v1.14h-1.52l.94-1.54c.21-.39.41-.79.58-1.19z" />
                        <path d="M252.9 252.89l.75-1a2.21 2.21 0 0 0 1.54.71c.69 0 1.15-.29 1.15-.83s-.38-1-1.92-1v-1.17c1.27 0 1.67-.37 1.67-1s-.32-.77-.88-.77a2.06 2.06 0 0 0-1.33.63l-.83-1a3.33 3.33 0 0 1 2.29-1c1.45 0 2.43.71 2.43 1.94a1.66 1.66 0 0 1-1.18 1.56 1.78 1.78 0 0 1 1.39 1.73c0 1.31-1.21 2.08-2.62 2.08a3.1 3.1 0 0 1-2.46-.88z" />
                        <path d="M231.83 252.83c1.81-1.71 3.08-2.91 3.08-3.93a1 1 0 0 0-.84-1.06h-.16a1.85 1.85 0 0 0-1.27.73l-.89-.87a3 3 0 0 1 2.37-1.21 2.1 2.1 0 0 1 2.33 1.81 2.16 2.16 0 0 1 0 .44 6.44 6.44 0 0 1-2.27 3.66 11.81 11.81 0 0 1 1.19 0h1.44v1.38h-5z" />
                        <path d="M207 252.44h1.54v-4.17h-1.33v-1a5.09 5.09 0 0 0 1.77-.64h1.21v5.74h1.33v1.34H207z" />
                      </g>
                      <path
                        className={styles["design-tool-line"]}
                        fill="none"
                        stroke="#7ec0ee"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={d}
                      />
                    </g>
                  </svg>
                </div>
                <div className={styles.items}>
                  <div className={styles.item}>전적 관련 데이터</div>
                  <div className={styles.item}>전적 관련 데이터</div>
                  <div className={styles.item}>전적 관련 데이터</div>
                  <div className={styles.item}>전적 관련 데이터</div>
                  <div className={styles.item}>전적 관련 데이터</div>
                </div>
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
