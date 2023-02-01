import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
} from "../constant/jiraConstant";
import { jiraServices } from "../../services/jiraServices";

import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";
import { history } from "../../util/history/history";

function* ProjectSaga(action) {
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
      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followcreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, ProjectSaga);
}

// ---------get all project

function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() => jiraServices.getListProject());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}
