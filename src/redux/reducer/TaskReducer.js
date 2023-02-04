import { GET_TASK_DETAIL } from "../constant/TaskConstants";

const initialState = {
  taskDetailModel: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 3553,
        avatar: "https://ui-avatars.com/api/?name=Alice Nguyen",
        name: "Alice Nguyen",
        alias: "alice-nguyen",
      },
      {
        id: 3453,
        avatar: "https://ui-avatars.com/api/?name=long long",
        name: "long long",
        alias: "long-long",
      },
      {
        id: 3548,
        avatar: "https://ui-avatars.com/api/?name=Mỹ Hà",
        name: "Mỹ Hà",
        alias: "my-ha",
      },
    ],
    lstComment: [],
    taskId: 8434,
    taskName: "Controllers",
    alias: "controllers",
    description:
      '<h2><span style="color: rgb(185, 106, 217);"><em><strong>Playing with fire tasks</strong></em></span></h2>',
    statusId: "2",
    originalEstimate: 7,
    timeTrackingSpent: 7,
    timeTrackingRemaining: 7,
    typeId: 2,
    priorityId: 1,
    projectId: 10756,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModel: action.taskDetailModel };
    }
    default:
      return { ...state };
  }
};
