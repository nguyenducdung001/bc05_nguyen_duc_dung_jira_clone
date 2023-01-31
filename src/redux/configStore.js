import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import JiraReducer from "./reducer/JiraReducer";
import { ProjectCategoryReducer } from "./reducer/ProjectCatagoryReducer";

import { rootSaga } from "./rootSaga";

// mididleware Saga
import createSagaMiddleware from "redux-saga";
import { HistoryReducer } from "./reducer/HistoryReducer";
import { UserLoginJiraReducer } from "./reducer/UserJiraReducer";

const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  JiraReducer,
  ProjectCategoryReducer,
  HistoryReducer,
  UserLoginJiraReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));

// Gắn middleWare rồi mới gọi saga
middleWareSaga.run(rootSaga);

export default store;
