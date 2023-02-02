import { USER_LOGIN_SETTING_SYSTEM } from "../../util/constants/settingSystem";
import { GET_USER_SEARCH, USLOGIN } from "./../constant/jiraConstant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN_SETTING_SYSTEM)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN_SETTING_SYSTEM));
}

const initialState = {
  userLogin: usLogin,
  userSearch: [],
};

export const UserLoginJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case GET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;
      // console.log("getUser", state);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
