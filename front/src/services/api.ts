// api.ts 파일
import axios from "axios";
import type { AxiosResponse, Method } from "axios";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_URL;
// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
axios.defaults.baseURL = "http://192.168.30.127:8081/";

export const ApiAxios = async <T>(url: string, method: Method = "GET", data?: any, headers?: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.request({
      url,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** 서버 API Axios */
// const SERVER_ADDRESS = "http://192.168.30.127:8081";
const SERVER_ADDRESS = "http://j9e101.p.ssafy.io:8081";
export const serverAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});

/** 워드클라우드 Axios */
const WORD_CLOUD_ADDRESS = "http://192.168.30.103:7777/api/wc30";
export const WordCloudAxios = axios.create({
  baseURL: `${WORD_CLOUD_ADDRESS}`,
});
