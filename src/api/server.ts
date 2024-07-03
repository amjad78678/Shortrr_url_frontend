import axios from "axios";
import errorHandle from "./error";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      
    }
    return Promise.reject(error);
  }
);
export const login = async (userData: { email: string; password: string }) => {
    try {
      const response = await Api.post('/login', userData);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
  };
  export const signup = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await Api.post('/signup', userData);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
  };