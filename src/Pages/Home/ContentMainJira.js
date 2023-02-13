import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { ref } from "yup";
import { Desktop, Tablet } from "../../HOC/Responsive";
import {
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "./../../redux/constant/TaskConstants";

export default function ContentMainJira(props) {
  const { projectDetail } = props;

  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    console.log(result);
    let { projectId, taskId } = JSON.parse(result.draggableId); //Lấy ra chuỗi sau mỗi lần droppable
    console.log(projectId, taskId);
    let { source, destination } = result;

    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    // gọi api cập nhật lại status
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskStatusUpdate: {
        taskId,
        statusId: destination.droppableId,
        projectId,
      },
    });
  };

  const renderLstTast = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskDetail.statusId}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card pb-2 mt-3"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">{taskDetail.statusName}</div>
                    <ul className="list-group list-group-flush">
                      {taskDetail.lstTaskDeTail.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId,
                            })}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  <p className="font-italic ">
                                    {task.taskName}
                                  </p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div
                                      className="block-left"
                                      style={{
                                        fontSize: "14px",
                                        color: "#10ac84",
                                      }}
                                    >
                                      {task.priorityTask.priority}
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
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
                                                alt={mem.avatar}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </ul>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <>
      <div className="content w-100" style={{ display: "flex" }}>
        {renderLstTast()}
      </div>
    </>
  );
}
