import { call, delay, put, takeLatest, select } from "redux-saga/effects";

import {
  CLOSE_DRAWER,
  GET_LIST_PROJECT,
  GET_PROJECT_DETAIL_API,
} from "../constant/jiraConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";
import { notiFunction } from "./../../util/Notification/NotificationJira";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK,
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGNESS,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../constant/TaskConstants";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { taskService } from "../../services/TaskService";
import { PUT_PROJECT_DETAIL } from "./../constant/jiraConstant";
import { createGlobalStyle } from "styled-components";

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

// --updateTask

function* updateTaskSaga(action) {}

export function* followUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

export function* handleChangePostApi(action) {
  // Gọi action làm thay đổi taskDetailModal
  console.log("abc", action);

  // switch (action.actionType) {
  //   case CHANGE_TASK_MODAL:
  //     {
  //       const { value, name } = action;
  //       yield put({
  //         type: CHANGE_TASK_MODAL,
  //         name,
  //         value,
  //       });
  //     }

  //   case CHANGE_ASSIGNESS: {
  //     const { userSelected } = action;
  //     yield put({
  //       type: CHANGE_ASSIGNESS,
  //       userSelected,
  //     });
  //   }

  //   case REMOVE_USER_ASSIGNESS:
  //     {
  //       const { userId } = action;
  //       yield put({
  //         type: REMOVE_USER_ASSIGNESS,
  //         userId,
  //       });
  //     }

  if (action.actionType == CHANGE_TASK_MODAL) {
    const { value, name } = action;
    yield put({
      type: CHANGE_TASK_MODAL,
      name,
      value,
    });
  } else if (action.actionType == CHANGE_ASSIGNESS) {
    const { userSelected } = action;
    yield put({
      type: CHANGE_ASSIGNESS,
      userSelected,
    });
  } else if (action.actionType == REMOVE_USER_ASSIGNESS) {
    const { userId } = action;
    yield put({
      type: REMOVE_USER_ASSIGNESS,
      userId,
    });
  }

  // Save qua api updateTaskSaga
  // Lấy dữ liệu từ state.taskDetailModal

  let { taskDetailModel } = yield select((state) => state.TaskReducer);
  console.log("taskDetailModal after change", taskDetailModel);
  // Biến dữ liệu taskDetailModal thành dữ liệu api cần

  const listUserAsign = taskDetailModel.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetailModel, listUserAsign };

  console.log("taskUpdateApi", taskUpdateApi);

  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectId: taskUpdateApi.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
