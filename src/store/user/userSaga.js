import { call, put, takeLatest } from "redux-saga/effects";
import { getUserById, getAllUser } from "../../services/userService";
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

function* fetchAllUsers({ payload }) {
  try {
    const res = yield call(getAllUser, payload);
    yield put({
      type: userAction.GET_ALL_USER_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* watchUserSage() {
  yield takeLatest(userAction.GET_USER_BY_ID, fetchUserById);
  yield takeLatest(userAction.GET_ALL_USER, fetchAllUsers);
}

export default watchUserSage;
