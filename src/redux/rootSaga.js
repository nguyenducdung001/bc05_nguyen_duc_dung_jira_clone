import { all } from "redux-saga/effects";
import * as ProjectCategorySaga from "./sagas/ProjectCatagorySaga";
import * as ProjectSaga from "./sagas/ProjectSaga";
import * as UserJiraSaga from "./sagas/UserJiraSaga";
import * as TaskTypeSaga from "./sagas/TaskTypeSaga";
import * as PrioritySaga from "./sagas/PrioritySaga";
import * as TaskSaga from "./sagas/TaskSaga";
import * as StatusSaga from "./sagas/StatusSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dõi các action saga
    ProjectCategorySaga.followAllProjectCategory(),
    ProjectSaga.followcreateProjectSaga(),
    UserJiraSaga.followSignInSaga(),
    UserJiraSaga.followGetUserByProjectIdSaga(),
    ProjectSaga.followGetListProjectSaga(),
    ProjectSaga.followUpdateProjectSaga(),
    ProjectSaga.followDeleteProjectSaga(),
    ProjectSaga.followGetProjectDetailSaga(),
    ProjectSaga.followGetAllProjectSaga(),
    UserJiraSaga.followGetUserSaga(),
    UserJiraSaga.followAddUserProjectSaga(),
    UserJiraSaga.followremoveUserFromProjectSaga(),
    TaskTypeSaga.followgetAllTaskTypeSaga(),
    PrioritySaga.followgetAllPrioritySaga(),
    TaskSaga.followCreateTaskSaga(),
    TaskSaga.followGetTaskDetailSaga(),
    TaskSaga.followUpdateStatusSaga(),
    TaskSaga.followUpdateTaskSaga(),
    TaskSaga.followHandleChangePostApi(),
    TaskSaga.followDeleteTaskSaga(),
    StatusSaga.followGetAllStatusSaga(),
  ]);
}
