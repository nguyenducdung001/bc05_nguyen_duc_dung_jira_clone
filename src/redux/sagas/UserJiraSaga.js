import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import {
  ADD_USER_PROJECT_API,
  GET_LIST_PROJECT_SAGA,
  GET_USER_API,
  GET_USER_SEARCH,
  REMOVE_USER_PROJECT_API,
  USER_SIGNIN_API,
  USER_SIGNUP_API,
  USLOGIN,
  US_REGISTER,
} from "./../constant/jiraConstant";
import { jiraServices } from "./../../services/jiraServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "./../constant/LoadingConst";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN_SETTING_SYSTEM,
} from "./../../util/constants/settingSystem";
import { history } from "../../util/history/history";
import { userService } from "../../services/userService";
import {
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../constant/UserConstant";
import { notiFunction } from "../../util/Notification/NotificationJira";

// Quản lí action saga
// Login
function* signInSaga(action) {
  console.log(action);
  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      jiraServices.signInJira(action.userLogin)
    );
    console.log(data);

    // Lưu vào localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);

    localStorage.setItem(
      USER_LOGIN_SETTING_SYSTEM,
      JSON.stringify(data.content)
    );

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    history.push("/jira");
  } catch (err) {
    console.log(err.response.data);
    notiFunction("error", "Incorrect! Please check email and password!");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followSignInSaga() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}

// Register
function* signUpSaga(action) {
  console.log(action);

  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      jiraServices.signUpJira(action.userRegister)
    );

    if (status == STATUS_CODE.SUCCESS) {
      console.log(data);
      notiFunction("success", "Register successfully!");
      history.push("/login");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followSignUnSaga() {
  yield takeLatest(USER_SIGNUP_API, signUpSaga);
}

// ---getUser

function* getUserSaga(action) {
  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    console.log("getUser", data);
    yield put({
      type: GET_USER_SEARCH,
      listUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followGetUserSaga() {
  yield takeLatest(GET_USER_API, getUserSaga);
}

// ---addUserProject

function* addUserProjectSaga(action) {
  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followAddUserProjectSaga() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

// ---removeUserFromProject

function* removeUserFromProjectSaga(action) {
  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      userService.removeUserFromProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followremoveUserFromProjectSaga() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserFromProjectSaga);
}

// ---getprojectId

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("checkdata", data);
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}

export function* followGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
