import {
  GET_ALL_PROJECT_DROPDOWN,
  GET_LIST_PROJECT,
} from "./../constant/jiraConstant";

const initialState = {
  projectList: [],
  arrProject: [], //get all project for dropdown
};

export const ProjectJiraReducer = (state = initialState, action) => {
  // console.log("projectList", action);
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList;
      return { ...state };
    }
    case GET_ALL_PROJECT_DROPDOWN: {
      return { ...state, arrProject: action.arrProject };
    }
    default:
      return { ...state };
  }
};
