import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../constant/TaskTypeConstant";
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { taskTypeService } from "./../../services/TaskTypeService";

function* getAllTaskTypeSaga(action) {
  try {
    const { data, status } = yield call(() => taskTypeService.getAllTaskType());

    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* followgetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
