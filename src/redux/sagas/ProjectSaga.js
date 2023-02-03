import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_DROPDOWN,
  GET_ALL_PROJECT_DROPDOWN_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL_API,
  PUT_PROJECT_DETAIL,
  UPDATE_PROJECT_SAGA,
} from "../constant/jiraConstant";
import { jiraServices } from "../../services/jiraServices";

import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";
import { history } from "../../util/history/history";
import { CLOSE_DRAWER } from "./../constant/jiraConstant";
import { projectService } from "../../services/ProjectService";
import { notiFunction } from "./../../util/Notification/NotificationJira";

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

// ---------get list project

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

// -----updateproject

function* updateProjectSaga(action) {
  // console.log("action", action);
  // return;
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      jiraServices.updateProject(action.projectUpdate)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: GET_LIST_PROJECT_SAGA,
      });
      // yield call(getListProjectSaga);
      yield put({
        type: CLOSE_DRAWER,
      });

      // history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// -----deleteProject

function* deleteProjectSaga(action) {
  // console.log("action", action);
  // return;
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.projectId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: GET_LIST_PROJECT_SAGA,
      });

      notiFunction("success", "Delete project successfully!");
    } else {
      notiFunction("error", "Delete project fail!");
    }
  } catch (err) {
    notiFunction("error", "Delete project fail!");
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

// -----getProjectDetailSaga

function* getProjectDetailSaga(action) {
  // console.log("action", action);
  // return;
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );

    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    console.log("404 not found!");
    history.push("/projectmanagement");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailSaga);
}

// ---------get all project

function* getAllProjectSaga(action) {
  try {
    const { data, status } = yield call(() => projectService.getAllProject());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_DROPDOWN,
        arrProject: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_DROPDOWN_SAGA, getAllProjectSaga);
}
