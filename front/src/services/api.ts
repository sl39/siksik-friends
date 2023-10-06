// api.ts 파일
import axios from "axios";

/** 서버 API Axios */
const SERVER_ADDRESS = process.env.NEXT_PUBLIC_AXIOS_URL;

export const serverAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}/api`,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
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
        updateConfig.headers.authorization = `Bearer ${accessToken}`;
      }
      return updateConfig;
    } catch (err) {
      console.error(`[_axios.interceptors.request] config : ${err}`);
      console.log(err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    console.log("요청 에러 직전");
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

    // 401(즉, 권한 없음)인 경우에만 토큰을 재발급
    if (error.response.status === 401) {
      // refresh 토큰 재발급 및 accessToken 갱신
    }
    return Promise.reject(error);
  }
);

// /** 워드클라우드 Axios */
// export const WordCloudAxios = axios.create({
//   baseURL: `${SERVER_ADDRESS}/api/user/word-cloud`,
// });

/** 소켓 서버 Axios */
export const socketAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}/socket`,
});
