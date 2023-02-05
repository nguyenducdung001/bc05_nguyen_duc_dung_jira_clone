import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

const defaultValue = [
  { id: 1, taskName: "task 1" },
  { id: 2, taskName: "task 2" },
  { id: 3, taskName: "task 3" },
  { id: 4, taskName: "task 4" },
  { id: 5, taskName: "task 5" },
];

export default function DemoDragDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);

  const handleDragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    console.log("index", index);
  };

  const handleDragOver = (e) => {
    console.log("targetOver", e.target);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    // console.log("dragend", e.target);
  };

  const handleDrop = (e) => {
    console.log("drop", e.target);
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
            return (
              <div
                onDragEnd={handleDragEnd}
                onDragEnter={handleDragOver}
                key={index}
                className="bg-success text-white m-1 p-3 text-center"
                draggable="true"
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div
          className="col-2 p-5 bg-warning"
          draggable="true"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          Alexa
        </div>
      </div>
    </div>
  );
}
