import { takeLatest } from "redux-saga/effects";
import {
  getListFollowOfMe,
  addFollow,
  removeFollow,
} from "../../services/followService";
import { followAction } from "../action";
import { fetchList, addNewItem, deleteItem } from "../sagaCommon";

function* fetchAllFollows({ payload }) {
  yield fetchList(getListFollowOfMe, payload, "Get list follow of me");
}

function* addFollows({ payload }) {
  yield addNewItem(addFollow, payload, "Add follow");
}

function* removeFollows({ id }) {
  yield deleteItem(removeFollow, id, "Remove follow");
}

function* watchFollowSaga() {
  yield takeLatest(followAction.REMOVE_FOLLOW, removeFollows);
  yield takeLatest(followAction.ADD_FOLLOW, addFollows);
  yield takeLatest(followAction.GET_LIST_FOLLOW, fetchAllFollows);
}

export default watchFollowSaga;
