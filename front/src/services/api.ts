// api.ts 파일
import axios from "axios";

/** 서버 API Axios */
const SERVER_ADDRESS = process.env.NEXT_PUBLIC_AXIOS_URL;

export const serverAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  // headers: { 'Content-Type': 'application/json' }
});

/** 워드클라우드 Axios */
const WORD_CLOUD_ADDRESS = process.env.NEXT_PUBLIC_WORD_CLOUD_URL;
export const WordCloudAxios = axios.create({
  baseURL: `${WORD_CLOUD_ADDRESS}`,
});
