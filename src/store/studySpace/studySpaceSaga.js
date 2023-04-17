import { call, put, takeLatest } from "redux-saga/effects";
import { getAllGroup, createNewGroup } from "../../services/studySpaceService";
import { studySpaceAction } from "../action";
import { NotificationManager } from "react-notifications";

function* fetchAllGroups({ payload }) {
  try {
    const res = yield call(getAllGroup, payload?.userId);
    yield put({
      type: studySpaceAction.GET_ALL_GROUP_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* createNewGroups({ payload }) {
  try {
    const res = yield call(createNewGroup, payload);
    NotificationManager.success(res?.data?.message, "Create new group", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Create new group",
      4000
    );
  }
}

function* watchStudySpaceSaga() {
  yield takeLatest(studySpaceAction.CREATE_NEW_GROUP, createNewGroups);
  yield takeLatest(studySpaceAction.GET_ALL_GROUP, fetchAllGroups);
}

export default watchStudySpaceSaga;
