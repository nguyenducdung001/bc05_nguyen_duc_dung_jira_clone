import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { USER_SIGNIN_API, USLOGIN } from "./../constant/jiraConstant";
import { jiraServices } from "./../../services/jiraServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "./../constant/LoadingConst";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN_SETTING_SYSTEM,
} from "./../../util/constants/settingSystem";
import { history } from "../../util/history/history";

// Quản lí action saga

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

    // console.log(localStorage.getItem(TOKEN));

    localStorage.setItem(
      USER_LOGIN_SETTING_SYSTEM,
      JSON.stringify(data.content)
    );

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    // let history = yield select((state) => state.HistoryReducer.history);

    history.push("/jira");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followSignInSaga() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
