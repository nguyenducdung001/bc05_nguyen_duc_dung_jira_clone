import { USER_LOGIN_SETTING_SYSTEM } from "../../util/constants/settingSystem";
import { USLOGIN } from "./../constant/jiraConstant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN_SETTING_SYSTEM)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN_SETTING_SYSTEM));
}

const initialState = {
  userLogin: usLogin,
};

export const UserLoginJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
