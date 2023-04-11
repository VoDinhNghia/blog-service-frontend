import { all } from "redux-saga/effects";

import watchGetAllPost from "./postSaga";

export function* rootSagas() {
  yield all([watchGetAllPost()]);
}
