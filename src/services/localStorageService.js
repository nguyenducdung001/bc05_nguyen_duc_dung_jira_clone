export const USER_LOGIN = "USER_LOGIN";

export const userLocaService = {
  set: (userData) => {
    let userJson = JSON.stringify(userData);
    localStorage.setItem(USER_LOGIN, userJson);
    // localStorage.setItem(TOKEN, userJson.content.accessToken);
  },
  get: () => {
    let userJson = localStorage.getItem(USER_LOGIN);
    if (userJson != null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(USER_LOGIN);
  },
};
