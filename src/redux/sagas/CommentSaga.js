import { func } from "prop-types";
import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { CLOSING } from "ws";
import { commentService } from "../../services/CommentService";
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../constant/CommentConstant";
import { GET_TASK_DETAIL_SAGA } from "../constant/TaskConstants";
import { STATUS_CODE } from "./../../util/constants/settingSystem";
import { notification } from "antd";
import { notiFunction } from "./../../util/Notification/NotificationJira";

// ---get all comment
function* getAllCommentSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.getAllComment(taskId)
    );

    console.log(data);
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followGetAllCommentSaga() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

// ----insert comment

function* insertCommentSaga(action) {
  console.log("inserAction", action);
  const { commentContent } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.insertComment(commentContent)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: INSERT_COMMENT,
        commentContent: data.content,
      });
      console.log("insert", data);

      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: data.content.taskId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: data.content.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

// ----delete comment

function* deleteCommentSaga(action) {
  const { comment } = action;
  //
  try {
    const { data, status } = yield call(() =>
      commentService.deleteComment(comment.idComment)
    );

    if (status === STATUS_CODE.SUCCESS) {
      notiFunction("success", "Delete comment successfully");

      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: comment.taskId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: comment.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

// ----update comment

function* updateCommentSaga(action) {
  const { updateComment } = action;
  //
  try {
    const { data, status } = yield call(() =>
      commentService.updateComment(updateComment)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: data.content.taskId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: data.content.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
