import { GET_LIST_PROJECT } from "./../constant/jiraConstant";

const initialState = {
  projectList: [],
};

export const ProjectJiraReducer = (state = initialState, action) => {
  // console.log("projectList", action);
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
