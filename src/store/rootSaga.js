import { all } from "redux-saga/effects";

import watchGetAllPost from "./postSaga";
import watchUserSage from "./userSaga";

export function* rootSagas() {
  yield all([watchGetAllPost(), watchUserSage()]);
}
