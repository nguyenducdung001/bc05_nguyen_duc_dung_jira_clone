import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT,
} from "./../constant/jiraConstant";
import { jiraServices } from "./../../services/jiraServices";

import { STATUS_CODE } from "./../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "./../constant/LoadingConst";

function* createProjectSaga(action) {
  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      jiraServices.createProjectAuthorization(action.newProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch lên reducer thông qua put
      // yield put({
      //   type: GET_ALL_PROJECT,
      //   data: data.content,
      // });
      console.log(data);
    }
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followcreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}
