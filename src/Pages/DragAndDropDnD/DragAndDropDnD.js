import React, { useState } from "react";
import _, { map } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Provider } from "react-redux";

export default function DragAndDropDnd(props) {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "task 1" },
        { id: "2", taskName: "task 2" },
        { id: "3", taskName: "task 3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "task 4" },
        { id: "5", taskName: "task 5" },
        { id: "6", taskName: "task 6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "task 7" },
        { id: "8", taskName: "task 8" },
        { id: "9", taskName: "task 9" },
      ],
    },
  });

  return (
    <div className="container">
      <h3 className="text-center display-4">Demo DragAndDrop DND</h3>

      <DragDropContext
        onDragEnd={(result) => {
          const { destination, source } = result;

          if (!destination) {
            return;
          }
          if (
            destination.index == source.index &&
            destination.droppableId == source.draggableId
          ) {
            return;
          }

          // Tạo ra một tag drag
          let itemCopy = state[source.droppableId].items[source.index];
          console.log("itemCopy", itemCopy); //== state.toDo.items[index]

          // Droppable bắt đầu kéo
          let dropSource = state[source.droppableId].items.filter(
            (item) => item.id !== itemCopy.id
          );

          state[source.droppableId].items = dropSource;

          console.log("dropSource", dropSource);
          // Droppable thả vào
          let dropDestination = state[destination.droppableId].items;

          dropDestination.splice(destination.index, 0, itemCopy);
          console.log("dropDestination", dropDestination);
          console.log("destination", destination);

          setState(state);
        }}
      >
        <div className="row">
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable key={index} droppableId={statusTask.id}>
                {(provided) => {
                  return (
                    <div className="col-4">
                      <div
                        className=" bg-dark p-5"
                        key={index}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h5 className="text-white font-italic text-center">
                          {statusTask.id}
                        </h5>
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              index={index}
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mt-2 p-3 bg-white text-center"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
