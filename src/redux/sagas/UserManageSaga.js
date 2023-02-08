import { put, takeLatest, delay } from "redux-saga/effects";
import {
  DELETE_USER_SAGA,
  GET_LIST_USER,
  GET_LIST_USER_SAGA,
  UPDATE_USER_SAGA,
} from "../constant/UserManageConstant";
import { call } from "redux-saga/effects";
import { userService } from "../../services/userService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";
import { notiFunction } from "./../../util/Notification/NotificationJira";

// ---get list user
function* getListUserSaga(action) {
  try {
    const { data, status } = yield call(() => userService.getListUser());

    if (status === STATUS_CODE.SUCCESS) {
      console.log("getListUserData", data);

      yield put({
        type: GET_LIST_USER,
        userList: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followGetListUserSaga() {
  yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga);
}

// ---update user
function* updateUserSaga(action) {
  console.log("updateUser", action);
  const { editUser } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => userService.updateUser(editUser));

    if (status === STATUS_CODE.SUCCESS) {
      console.log("updateUser", data);

      // yield put({
      //   type: GET_LIST_USER,

      // });
      notiFunction("success", "Update user successfully!");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

// ---delete user
function* deleteUserSaga(action) {
  console.log("deleteAction", action);
  const { deleteUser } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      userService.deleteUser(deleteUser.userId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("deleteAction", data);

      // yield put({
      //   type: GET_LIST_USER,

      // });
      notiFunction("success", "Delete user successfully!");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
