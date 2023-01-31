import { all } from "redux-saga/effects";
import * as ProjectCategorySaga from "./sagas/ProjectCatagorySaga";
import * as CreateProjectSaga from "./sagas/CreateProjectSaga";
import * as UserJiraSaga from "./sagas/UserJiraSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dõi các action saga
    ProjectCategorySaga.followAllProjectCategory(),
    CreateProjectSaga.followcreateProjectSaga(),
    UserJiraSaga.followSignInSaga(),
  ]);
}
