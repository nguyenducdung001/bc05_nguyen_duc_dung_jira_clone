import { all } from "redux-saga/effects";
import * as ProjectCategorySaga from "./sagas/ProjectCatagorySaga";
import * as ProjectSaga from "./sagas/ProjectSaga";
import * as UserJiraSaga from "./sagas/UserJiraSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dõi các action saga
    ProjectCategorySaga.followAllProjectCategory(),
    ProjectSaga.followcreateProjectSaga(),
    UserJiraSaga.followSignInSaga(),
    ProjectSaga.followGetListProjectSaga(),
    ProjectSaga.followUpdateProjectSaga(),
    ProjectSaga.followDeleteProjectSaga(),
  ]);
}
