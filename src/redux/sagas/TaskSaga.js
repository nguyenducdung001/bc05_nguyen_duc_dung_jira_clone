import { call, delay, put, takeLatest } from "redux-saga/effects";

import {
  CLOSE_DRAWER,
  GET_LIST_PROJECT,
  GET_PROJECT_DETAIL_API,
} from "../constant/jiraConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";
import { notiFunction } from "./../../util/Notification/NotificationJira";
import {
  CREATE_TASK,
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../constant/TaskConstants";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { taskService } from "../../services/TaskService";
import { PUT_PROJECT_DETAIL } from "./../constant/jiraConstant";

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

// ---getTaskDetail

function* getTaskDetailSaga(action) {
  const { taskId } = action;

  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModel: data.content,
    });
  } catch (err) {
    console.log(err);
    console.log(err.respone?.data);
  }
}

export function* followGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// ---update task

function* updateTaskStatusSaga(action) {
  const { taskStatusUpdate } = action;

  try {
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskStatusUpdate)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectId: taskStatusUpdate.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskStatusUpdate.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.respone?.data);
  }
}

export function* followUpdateStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}
