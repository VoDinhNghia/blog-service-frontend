import { all } from "redux-saga/effects";

import watchGetAllPost from "./saga";

export function* rootSagas() {
  yield all([watchGetAllPost()]);
}
