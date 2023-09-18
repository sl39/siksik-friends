// api.ts 파일
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_URL;

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
