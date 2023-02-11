import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { ProjectCategoryReducer } from "./reducer/ProjectCatagoryReducer";

import { rootSaga } from "./rootSaga";

// mididleware Saga
import createSagaMiddleware from "redux-saga";
import { HistoryReducer } from "./reducer/HistoryReducer";
import { UserLoginJiraReducer } from "./reducer/UserJiraReducer";
import { ProjectJiraReducer } from "./reducer/ProjectJiraReducer";
import { DrawerJiraReducer } from "./reducer/DrawerJiraReducer";
import { ProjectReducer } from "./reducer/ProjectReducer";
import { LoadingReducer } from "./reducer/LoadingReducer";
import { TaskTypeReducer } from "./reducer/TaskTypeReducer";
import { PriorityReducer } from "./reducer/PriorityReducer";
import { StatusReducer } from "./reducer/StatusReducer";
import { TaskReducer } from "./reducer/TaskReducer";
import { UserManageReducer } from "./reducer/UserManageReducer";

const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  // reducer khai báo tại đây

  ProjectCategoryReducer,
  HistoryReducer,
  UserLoginJiraReducer,
  ProjectJiraReducer,
  DrawerJiraReducer,
  ProjectReducer,
  LoadingReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskReducer,
  UserManageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));

// Gắn middleWare rồi mới gọi saga
middleWareSaga.run(rootSaga);

export default store;
