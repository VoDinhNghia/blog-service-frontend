import { call, put, takeLatest } from "redux-saga/effects";
import { getAllGroup } from "../../services/studySpaceService";
import { studySpaceAction } from "../action";
// import { NotificationManager } from "react-notifications";

function* fetchAllGroups({ payload }) {
  try {
    const res = yield call(getAllGroup, payload?.userId);
    yield put({
      type: studySpaceAction.GET_ALL_GROUP_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* watchStudySpaceSaga() {
  yield takeLatest(studySpaceAction.GET_ALL_GROUP, fetchAllGroups);
}

export default watchStudySpaceSaga;
