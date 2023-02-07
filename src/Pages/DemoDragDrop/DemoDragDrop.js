import React, { useRef, useState } from "react";
import "./DemoDragDrop.css";

import { animated, useSpring, to, useTransition } from "@react-spring/web";

const defaultValue = [
  { id: 1, taskName: "task 1" },
  { id: 2, taskName: "task 2" },
  { id: 3, taskName: "task 3" },
  { id: 4, taskName: "task 4" },
  { id: 5, taskName: "task 5" },
];

export default function DemoDragDrop() {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});
  const tagDragEnter = useRef({}); //Mỗi lần setState lại vẫn giữ giá trị

  // Animation
  const [propsSping, set, top] = useSpring(() => ({
    from: { bottom: -25 },
    to: { bottom: 0 },
    config: { duration: 250 },
    reset: true,
  }));

  const handleDragOver = (e) => {
    // console.log("targetOver", e.target);
    // e.stopPropagation();
    // e.preventDefault();
  };

  const handleDrop = (e) => {};

  const handleDragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    // Lưu lại giá trị của task đang drag
    tagDrag.current = task;
  };

  const handleDragEnd = (e) => {
    set({ bottom: 0 });
    tagDrag.current = {};

    setTaskList([...taskList]);
  };

  const handleDragEnter = (e, taskDragEnter, index) => {
    console.log("DragEntertag", e.target);
    console.log("targetOver", taskDragEnter);
    console.log("index", index);

    // Lưu lại giá trị của task được kéo ngang qua
    tagDragEnter.current = { ...taskDragEnter };

    let taskListUpdate = [...taskList];
    // Lấy index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );
    // Lấy index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );
    // Biến chứa giá trị thằng đang kéo
    let temp = taskListUpdate[indexDragTag];
    // Lấy giá trị tại vị trị đang kéo gắn bằng thằng kéo qua
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    // Lấy thằng kéo qua gán bằng đan kéo
    taskListUpdate[indexDragEnter] = temp;

    setTaskList(taskListUpdate);
  };

  return (
    <div className="container">
      <div className="text-center display-4" onDragOver={handleDragOver}>
        Task list
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="bg-dark p-5 col-8">
          {taskList.map((task, index) => {
            let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";

            if (task.id === tagDragEnter.current.id) {
              return (
                <animated.div
                  style={{
                    position: "relative",
                    bottom: propsSping.bottom.interpolate((num) => `${num}px`),
                  }}
                  onDragEnd={handleDragEnd}
                  key={index}
                  className={`bg-success text-white m-1 p-3 text-center ${cssDragTag}`}
                  draggable="true"
                  onDragStart={(e) => {
                    handleDragStart(e, task, index);
                  }}
                  onDragEnter={(e) => {
                    handleDragEnter(e, task, index);
                  }}
                ></animated.div>
              );
            }

            return (
              <div
                onDragEnd={handleDragEnd}
                key={index}
                className={`bg-success text-white m-1 p-3 text-center ${cssDragTag}`}
                draggable="true"
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task, index);
                }}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div className="col-2 p-5 bg-warning">Alexa</div>
      </div>
    </div>
  );
}

// draggable="true"
// onDrop={handleDrop}
// onDragOver={(e) => {
//   e.stopPropagation();
//   e.preventDefault();
// }}
