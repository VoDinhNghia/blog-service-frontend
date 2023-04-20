import { all } from "redux-saga/effects";

import watchGetAllPost from "./post/postSaga";
import watchUserSage from "./user/userSaga";
import watchStudySpaceSaga from "./studySpace/studySpaceSaga";
import watchFollowSaga from "./follow/followSaga";

export function* rootSagas() {
  yield all([
    watchGetAllPost(),
    watchUserSage(),
    watchStudySpaceSaga(),
    watchFollowSaga(),
  ]);
}
