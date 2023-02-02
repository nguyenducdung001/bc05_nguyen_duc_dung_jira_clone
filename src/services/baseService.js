import axios from "axios";
import { BASE_URL, createConfig, TOKEN_CYBERSOFT } from "./../api/configURL";
import { TOKEN } from "./../util/constants/settingSystem";

export class baseService {
  put = (url, model) => {
    return axios({
      url: `${BASE_URL}/${url}`,
      method: "PUT",
      data: model,
      headers: createConfig(),
    });
  };

  post = (url, model) => {
    return axios({
      url: `${BASE_URL}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  };
  get = (url) => {
    return axios({
      url: `${BASE_URL}/${url}`,
      method: "GET",
      headers: createConfig(),
    });
  };

  delete = (url) => {
    return axios({
      url: `${BASE_URL}/${url}`,
      method: "DELETE",
      headers: createConfig(),
    });
  };
}
