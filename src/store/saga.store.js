import { all } from "redux-saga/effects";

import watchGetAllPost from "./post/saga";
import watchUserSage from "./user/saga";
import watchStudySpaceSaga from "./study-space/saga";
import watchFollowSaga from "./follow/saga";
import watchMessageSage from "./message/saga";

export function* rootSagas() {
  yield all([
    watchGetAllPost(),
    watchUserSage(),
    watchStudySpaceSaga(),
    watchFollowSaga(),
    watchMessageSage(),
  ]);
}
