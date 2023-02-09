import {
  GET_ALL_PROJECT_DROPDOWN,
  GET_LIST_PROJECT,
} from "./../constant/jiraConstant";

const initialState = {
  projectList: [],
  //get all project for dropdown
  arrProject: [],
};

export const ProjectJiraReducer = (state = initialState, action) => {
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
