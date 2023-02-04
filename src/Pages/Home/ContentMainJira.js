import React from "react";

import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA } from "./../../redux/constant/TaskConstants";

export default function ContentMainJira(props) {
  const { projectDetail } = props;

  const dispatch = useDispatch();

  const renderLstTast = () => {
    return projectDetail.lstTask?.map((taskDetail, index) => {
      return (
        <div
          key={index}
          className="card pb-2"
          style={{ width: "17rem", height: "auto" }}
        >
          <div className="card-header">{taskDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            {taskDetail.lstTaskDeTail.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({
                      type: GET_TASK_DETAIL_SAGA,
                      taskId: task.taskId,
                    });
                  }}
                >
                  <p className="font-italic ">{task.taskName}</p>
                  <div className="block" style={{ display: "flex" }}>
                    <div
                      className="block-left"
                      style={{ fontSize: "14px", color: "#10ac84" }}
                    >
                      {task.priorityTask.priority}
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        {task.assigness.map((mem, index) => {
                          return (
                            <div key={index} className="avatar">
                              <img
                                style={{
                                  width: "30px",
                                  borderRadius: "50%",
                                  border: "none",
                                  height: "30px",
                                  marginLeft: "4px",
                                }}
                                src={mem.avatar}
                                alt
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderLstTast()}
    </div>
  );
}
