import { combineReducers } from "redux";
import JiraReducer from "./JiraReducer";
import { ProjectCategoryReducer } from "./ProjectCatagoryReducer";
import { HistoryReducer } from "./HistoryReducer";

export const rootReducer = combineReducers({
  JiraReducer,
  ProjectCategoryReducer,
});
