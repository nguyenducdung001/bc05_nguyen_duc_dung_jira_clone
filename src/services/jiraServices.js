import axios from "axios";
import { BASE_URL, createConfig, TOKEN_CYBERSOFT } from "../api/configURL";
import { TOKEN } from "./../util/constants/settingSystem";

export const jiraServices = {
  signUpJira: (dataUser) => {
    return axios({
      url: `${BASE_URL}/api/Users/signup`,
      method: "POST",
      data: dataUser,
      headers: createConfig(),
    });
  },
  signInJira: (dataUser) => {
    return axios({
      url: `${BASE_URL}/api/Users/signin`,
      method: "POST",
      data: dataUser,
      headers: createConfig(),
    });
  },
  getAllProjectCategory: () => {
    return axios({
      url: `${BASE_URL}/api/ProjectCategory`,
      method: "GET",

      headers: createConfig(),
    });
  },
  createProject: (newProject) => {
    return axios({
      url: `${BASE_URL}/api/Project/createProject`,
      method: "POST",
      data: newProject,
      headers: createConfig(),
    });
  },
  createProjectAuthorization: (newProject) => {
    return axios({
      url: `${BASE_URL}/api/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
      // headers: createConfig(),
    });
  },
  getListProject: () => {
    return axios({
      url: `${BASE_URL}/api/Project/getAllProject`,
      method: "GET",
      headers: createConfig(),
    });
  },
};
