import { call, delay, put, takeLatest } from "redux-saga/effects";

import { taskTypeService } from "./../../services/TaskTypeService";
import { priorityService } from "../../services/PriorityService";
import { GET_ALL_PRIORITY_SAGA } from "../constant/PriorityConstant";
import { GET_ALL_PRIORITY } from "./../constant/PriorityConstant";

function* getAllPrioritySaga(action) {
  try {
    const { data, status } = yield call(() => priorityService.getAllPriority());

    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* followgetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
