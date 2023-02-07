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
} from "../constant/CommentConstant";
import { STATUS_CODE } from "./../../util/constants/settingSystem";

// ---get all comment
function* getAllCommentSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.getAllComment(taskId)
    );
    // yield put({
    //   type: GET_ALL_COMMENT,
    // });

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
  // console.log("inserAction", action);
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
    }

    // console.log("insertComment", data);
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
  console.log("dele", action);
  const { idComment } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.deleteComment(idComment)
    );

    if (status === STATUS_CODE.SUCCESS) {
      // yield put({
      //   type: INSERT_COMMENT,
      //   commentContent: data.content,
      // });
    }

    console.log("delete", data);
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
