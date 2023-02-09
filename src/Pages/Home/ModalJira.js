import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "../../redux/constant/PriorityConstant";
import { GET_ALL_STATUS_SAGA } from "../../redux/constant/StatusConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGNESS,
  UPDATE_STATUS_TASK_SAGA,
} from "../../redux/constant/TaskConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../redux/constant/TaskTypeConstant";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Popconfirm, Button } from "antd";
import { ToolOutlined } from "@ant-design/icons";
// import { type } from "os";
import {
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../redux/constant/CommentConstant";
import { CLOSING } from "ws";
import { GET_ALL_COMMENT_SAGA } from "./../../redux/constant/CommentConstant";

const { option } = Select;

export default function ModalJira(props) {
  const { taskDetailModel } = useSelector((state) => state.TaskReducer);

  const { arrStatus } = useSelector((state) => state.StatusReducer);

  const { arrPriority } = useSelector((state) => state.PriorityReducer);

  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);

  const { editComment } = useSelector((state) => state.TaskReducer);

  const [visibleEditor, setVisibleEditor] = useState(false);

  const [valueDesc, setValueDesc] = useState("");

  const [historyContent, setHistoryContent] = useState(
    taskDetailModel.description
  );
  const [content, setContent] = useState(taskDetailModel.description);

  const [contentComment, setContentComment] = useState("");

  const [detailTask, setDetailTask] = useState(taskDetailModel);

  console.log("taskDetailModel", taskDetailModel);

  const dispatch = useDispatch();

  useEffect(() => {
    setDetailTask(taskDetailModel);
    setValueDesc(taskDetailModel.description);
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_COMMENT_SAGA });
  }, []);

  const renderDesctiption = () => {
    const jsxDescription = (
      <td dangerouslySetInnerHTML={{ __html: taskDetailModel.description }} />
    );

    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModel.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                // setFieldValue("description", content); //hàm của formik
                setContent(content);
              }}
            />
            <button
              className="btn btn-outline-secondary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });

                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-outline-secondary m-2"
              onClick={() => {
                setHistoryContent(taskDetailModel.description);
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setVisibleEditor(!visibleEditor);
            }}
          >
            {" "}
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModel;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);

    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={Number(timeTrackingSpent)}
            aria-valuemin={Number(timeTrackingRemaining)}
            aria-valuemax={max}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p className="logged">{Number(timeTrackingSpent)}h logged</p>
          <p className="estimate-time">
            {Number(timeTrackingRemaining)}h remaining
          </p>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              type="number"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              type="number"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* Search modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <select
                  onChange={handleChange}
                  name="typeId"
                  value={taskDetailModel.typeId}
                >
                  {arrTaskType.map((tp, index) => {
                    return (
                      <option key={index} value={tp.id}>
                        {tp.taskType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>

                  <Button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      if (
                        window.confirm("Are you sure to delete this task?") ==
                        true
                      ) {
                        dispatch({
                          type: DELETE_TASK_SAGA,
                          task: taskDetailModel,
                        });
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash-alt"
                      style={{ cursor: "pointer" }}
                    />
                  </Button>
                </div>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">{taskDetailModel.taskName}</p>
                    <div className="description">
                      <p>Description</p>
                      {renderDesctiption()}
                    </div>

                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img src={taskDetailModel.lstComment.avatar} alt />
                        </div>
                        <div className="input-comment">
                          <Editor
                            name="contentComment"
                            initialValue={editComment.contentComment}
                            value={contentComment}
                            init={{
                              height: 300,
                              menubar: false,
                              plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                              ],
                              toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                            onEditorChange={(content, editor) => {
                              // setFieldValue("description", content); //hàm của formik
                              setContentComment(content);
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary m-2 font-weight-light"
                            onClick={() => {
                              dispatch({
                                type: INSERT_COMMENT_SAGA,
                                commentContent: {
                                  taskId: taskDetailModel.taskId,
                                  contentComment: contentComment,
                                },
                              });
                              setContentComment("");
                            }}
                          >
                            Create
                          </button>
                          <button
                            onClick={() => {}}
                            className="btn btn-outline-secondary m-2 font-weight-light"
                          >
                            Cancle
                          </button>
                          <button
                            onClick={() => {
                              dispatch({
                                type: UPDATE_COMMENT_SAGA,
                                updateComment: {
                                  id: editComment.id,
                                  contentComment: contentComment,
                                },
                              });
                            }}
                            className="btn btn-outline-secondary m-2 font-weight-light"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div className="display-comment">
                            {taskDetailModel.lstComment.map((list, index) => {
                              return (
                                <div key={index} style={{ display: "flex" }}>
                                  <div
                                    className="avatar"
                                    style={{ fontSize: "10px" }}
                                  >
                                    <img
                                      style={{ fontSize: "10px" }}
                                      src={list.avatar}
                                      alt
                                    />
                                  </div>

                                  <div>
                                    <div style={{ fontSize: "20px" }}>
                                      {list.name}
                                    </div>
                                    <div
                                      className="font-italic"
                                      dangerouslySetInnerHTML={{
                                        __html: list.commentContent,
                                      }}
                                    />

                                    <div>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                          cursor: "pointer",
                                          fontWeight: "bold",
                                        }}
                                        onClick={() => {
                                          dispatch({
                                            type: EDIT_COMMENT,
                                            editComment: {
                                              id: list.id,
                                              userId: list.idUser,
                                              contentComment:
                                                list.commentContent,
                                              taskId: detailTask.taskId,
                                            },
                                          });
                                        }}
                                      >
                                        Edit
                                      </span>
                                      ----
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "14px",
                                          cursor: "pointer",
                                          fontWeight: "bold",
                                        }}
                                        onClick={() => {
                                          dispatch({
                                            type: DELETE_COMMENT_SAGA,
                                            comment: {
                                              taskId: taskDetailModel.taskId,
                                              idComment: list.id,
                                            },
                                          });
                                        }}
                                      >
                                        Delete
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        className="custom-select"
                        value={taskDetailModel.statusId}
                        onChange={(e) => {
                          {
                            handleChange(e);
                          }
                        }}
                      >
                        {arrStatus.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div className="row">
                        {taskDetailModel.assigness.map((user, index) => {
                          return (
                            <div key={index} className="col-6">
                              <div
                                className="item mb-2 mt-2"
                                style={{
                                  display: "flex",
                                  fontSize: "12px",
                                  width: "100%",
                                }}
                              >
                                <div className="avatar mr-2 ">
                                  <img src={user.avatar} alt />
                                </div>
                                <div className="name mt-1">
                                  {user.name}
                                  <i
                                    className="fa fa-times"
                                    style={{ marginLeft: 5, cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch({
                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                        actionType: REMOVE_USER_ASSIGNESS,
                                        userId: user.id,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="col-8 mb-2">
                        <Select
                          value="+ Add more"
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModel.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );

                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            ?.map((mem, index) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label"
                          name="lstUser"
                          style={{
                            width: "100%",
                          }}
                          onSelect={(value) => {
                            let userSelect = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            let userSelected = {
                              ...userSelect,
                              id: userSelect.userId,
                            };

                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected,
                            });
                          }}
                        ></Select>
                      </div>
                    </div>

                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        className="form-control"
                        value={taskDetailModel.priorityId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {arrPriority.map((priority, index) => {
                          return (
                            <option value={priority.priorityId} key={index}>
                              {priority.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        name="originalEstimate"
                        type="text"
                        className="estimate-hours"
                        value={taskDetailModel.originalEstimate}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      <div style={{ display: "flex" }}>
                        <i className="fa fa-clock" />
                        <div style={{ width: "100%" }}>
                          {renderTimeTracking()}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
