import { call, put, takeLatest } from "redux-saga/effects";
import { getUserById } from "../../services/userService";
import { userAction } from "../action";
import { NotificationManager } from "react-notifications";

function* fetchUserById({ payload }) {
  try {
    const res = yield call(getUserById, payload?.userId);
    yield put({
      type: userAction.GET_USER_BY_ID_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get user by id",
      4000
    );
  }
}

function* watchUserSage() {
  yield takeLatest(userAction.GET_USER_BY_ID, fetchUserById);
}

export default watchUserSage;
