import { call, delay, put, takeLatest } from "redux-saga/effects";

import { CLOSE_DRAWER, GET_LIST_PROJECT } from "../constant/jiraConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";
import { notiFunction } from "./../../util/Notification/NotificationJira";
import { CREATE_TASK, CREATE_TASK_SAGA } from "../constant/TaskConstants";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { taskService } from "../../services/TaskService";

function* createTaskSaga(action) {
  // Hiển thị loading

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskOject)
    );
    console.log(action);
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);

      yield put({
        type: CLOSE_DRAWER,
      });
      notiFunction("success", "Create task successfully!");
    }
  } catch (err) {
    console.log(err.respone.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
