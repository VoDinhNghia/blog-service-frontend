import { takeLatest } from "redux-saga/effects";
import { getUserById, getAllUser } from "../../services/user.service";
import { userAction } from "../action";
import { fetchById, fetchList } from "../sagaCommon";

function* fetchUserById({ payload }) {
  yield fetchById(
    getUserById,
    payload?.userId,
    userAction.GET_USER_BY_ID_SUCCESS,
    "Get user by id"
  );
}

function* fetchAllUsers({ payload }) {
  yield fetchList(
    getAllUser,
    payload,
    userAction.GET_ALL_USER_SUCCESS,
    "get all users"
  );
}

function* watchUserSage() {
  yield takeLatest(userAction.GET_USER_BY_ID, fetchUserById);
  yield takeLatest(userAction.GET_ALL_USER, fetchAllUsers);
}

export default watchUserSage;
