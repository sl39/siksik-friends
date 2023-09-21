// api.ts 파일
import axios from "axios";

/** 서버 API Axios */
const SERVER_ADDRESS = process.env.NEXT_PUBLIC_AXIOS_URL;

export const serverAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  // headers: { 'Content-Type': 'application/json' }
});

/** 요청 인터셉터 */
serverAxios.interceptors.request.use(
  // accessToken이 존재할 때, 해당 토큰을 헤더에 담아 요청
  (config) => {
    // 얕은 복사
    const updateConfig = { ...config };

    const accessToken = sessionStorage.getItem("accessToken");
    // eslint-disable-next-line no-param-reassign
    try {
      if (config.headers && accessToken) {
        updateConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log("인터셉터", updateConfig);
      return updateConfig;
    } catch (err) {
      console.error(`[_axios.interceptors.request] config : ${err}`);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/** 응답 인터셉터 */
serverAxios.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */
    return response;
  },
  (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    return Promise.reject(error);
  }
);

/** 워드클라우드 Axios */
const WORD_CLOUD_ADDRESS = process.env.NEXT_PUBLIC_WORD_CLOUD_URL;
export const WordCloudAxios = axios.create({
  baseURL: `${WORD_CLOUD_ADDRESS}`,
});
