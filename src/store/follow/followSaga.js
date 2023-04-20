import { call, put, takeLatest } from "redux-saga/effects";
import { getListFollowOfMe, addFollow } from "../../services/followService";
import { followAction } from "../action";
import { NotificationManager } from "react-notifications";

function* fetchAllFollows({ payload }) {
  try {
    const res = yield call(getListFollowOfMe, payload);
    yield put({
      type: followAction.GET_LIST_FOLLOW_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* addFollows({ payload }) {
  try {
    const res = yield call(addFollow, payload);
    NotificationManager.success(res?.data?.message, "Add follow", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Add follow",
      4000
    );
  }
}

function* watchFollowSaga() {
  yield takeLatest(followAction.ADD_FOLLOW, addFollows);
  yield takeLatest(followAction.GET_LIST_FOLLOW, fetchAllFollows);
}

export default watchFollowSaga;
