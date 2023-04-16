import { all } from "redux-saga/effects";

import watchGetAllPost from "./post/postSaga";
import watchUserSage from "./user/userSaga";
import watchStudySpaceSaga from "./studySpace/studySpaceSaga";

export function* rootSagas() {
  yield all([watchGetAllPost(), watchUserSage(), watchStudySpaceSaga()]);
}
