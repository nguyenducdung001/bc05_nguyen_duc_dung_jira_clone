import { USER_LOGIN_SETTING_SYSTEM } from "../../util/constants/settingSystem";
import { GET_USER_BY_PROJECT_ID } from "../constant/UserConstant";
import { GET_USER_SEARCH, USLOGIN } from "./../constant/jiraConstant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN_SETTING_SYSTEM)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN_SETTING_SYSTEM));
}

const initialState = {
  userLogin: usLogin,
  userSearch: [],
  //get for select of create task
  arrUser: [],
};

export const UserLoginJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case GET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;

      return { ...state };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }
    default:
      return { ...state };
  }
};
