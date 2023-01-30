import axios from "axios";
import { BASE_URL, createConfig } from "../api/configURL";

export const userService = {
  postDangKi: (dataUser) => {
    return axios({
      url: `${BASE_URL}/api/Users/signup`,
      method: "POST",
      data: dataUser,
      headers: createConfig(),
    });
  },
  postDangNhap: (dataUser) => {
    return axios({
      url: `${BASE_URL}/api/Users/signin`,
      method: "POST",
      data: dataUser,
      headers: createConfig(),
    });
  },
};
