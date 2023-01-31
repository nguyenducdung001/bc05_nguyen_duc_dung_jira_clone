import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_CATEGORY,
} from "./../constant/jiraConstant";
import { jiraServices } from "./../../services/jiraServices";
import { Statistic } from "antd";
import { STATUS_CODE } from "./../../util/constants/settingSystem";

function* getAllProjectCategory(action) {
  try {
    // Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      jiraServices.getAllProjectCategory()
    );
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch lên reducer thông qua put
      yield put({
        type: GET_ALL_PROJECT,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY, getAllProjectCategory);
}
