import axios from "axios";
import type { AxiosError } from "axios";

// 유저 관련 API
// const API_PATH = process.env.REACT_APP_API_PATH!;
const API_PATH = "https://jsonplaceholder.typicode.com/";

export const userApi = axios.create({
  baseURL: `${API_PATH}/user`,
  timeout: 2000,
});

// accessToken이 존재할 때, 해당 토큰을 헤더에 담아 요청할 수 있도록 해야 함
// interceptor: 요청 이전의 처리와 응답 이후의 처리
/** 요청 이전 헤더 세팅 */
userApi.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  // eslint-disable-next-line no-param-reassign
  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// refresh 동작
userApi.interceptors.response.use(
  // 성공시
  (response) => response,

  // 실패시
  (error: AxiosError) => {
    try {
      const originalRequest = error.config;

      if (originalRequest.url !== "/refresh") {
        return refreshAccessToken().then(() => userApi(originalRequest));
      }
      return Promise.reject();
    } catch {
      makeToast("error", "네트워크 오류가 발생했습니다.");
      return Promise.reject();
    }
  }
);

/** refreshToken 유효성에 따라 만료된 토큰 없애는 역할 동시 진행 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return Promise.reject();
  }
  try {
    const { data } = await userApi.get<RefreshResponse>("/refresh", {
      headers: { RefreshToken: `Bearer ${refreshToken}` },
    });
    sessionStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return Promise.reject();
  }
};
