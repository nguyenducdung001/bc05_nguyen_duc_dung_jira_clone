import { EDIT_PROJECT } from "./../constant/jiraConstant";
const initialState = {
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "3",
  },
};

export const ProjectReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case EDIT_PROJECT: {
      state.projectEdit = action.projectEditModal;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
