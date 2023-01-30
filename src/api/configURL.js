import axios from "axios";
import { userLocaService } from "../services/localStorageService";

export const BASE_URL = "https://jiranew.cybersoft.edu.vn";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNSIsIkhldEhhblN0cmluZyI6IjI4LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTIzMjAwMDAwMCIsIm5iZiI6MTY2MjMxMDgwMCwiZXhwIjoxNjg1Mzc5NjAwfQ.FtGbsXl4qyqTRfJrunro0mQ7b-tNs8EWbhb7JDTzloE";

export const createConfig = () => {
  return {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "bearer " + userLocaService.get()?.accessToken,
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: createConfig(),
});
