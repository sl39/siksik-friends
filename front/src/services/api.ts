// api.ts 파일
import axios from "axios";
import type { AxiosResponse, Method } from "axios";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_URL;
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const fetchData = async <T>(url: string, method: Method = "GET", data?: any, headers?: any): Promise<T> => {
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
