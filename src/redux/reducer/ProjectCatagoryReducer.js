import { GET_ALL_PROJECT } from "../constant/jiraConstant";

const initialState = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      state.arrProjectCategory = action.data;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
