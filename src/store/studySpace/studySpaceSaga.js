import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllGroup,
  createNewGroup,
  updateGroup,
  deleteGroup,
  addMember,
  deleteMember,
  leaveGroup,
  createNewTopic,
  getTopicById,
  updateTopic,
  deleteTopic,
  createNewProblem,
  updateProblem,
  deleteProblem,
  createNewSolution,
  updateSolution,
  deleteSolution,
} from "../../services/studySpaceService";
import { studySpaceAction } from "../action";
import { NotificationManager } from "react-notifications";

function* fetchAllGroups({ payload }) {
  try {
    const res = yield call(getAllGroup, payload);
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

function* updateGroups({ id, payload }) {
  try {
    const res = yield call(updateGroup, id, payload);
    NotificationManager.success(res?.data?.message, "Update group", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update group",
      4000
    );
  }
}

function* deleteGroups({ id }) {
  try {
    const res = yield call(deleteGroup, id);
    NotificationManager.success(res?.data?.message, "Delete group", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete group",
      4000
    );
  }
}

function* addMembers({ id, payload }) {
  try {
    const res = yield call(addMember, id, payload);
    NotificationManager.success(res?.data?.message, "Add member", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Add member",
      4000
    );
  }
}

function* deleteMembers({ id }) {
  try {
    const res = yield call(deleteMember, id);
    NotificationManager.success(res?.data?.message, "Delete member", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete member",
      4000
    );
  }
}

function* leaveGroups({ groupId }) {
  try {
    const res = yield call(leaveGroup, groupId);
    NotificationManager.success(res?.data?.message, "Leave froup", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Leave group",
      4000
    );
  }
}

function* createNewTopics({ payload }) {
  try {
    const res = yield call(createNewTopic, payload);
    NotificationManager.success(res?.data?.message, "Create new topic", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Create new topic",
      4000
    );
  }
}

function* fetchTopicById({ id }) {
  try {
    const res = yield call(getTopicById, id);
    yield put({
      type: studySpaceAction.GET_TOPIC_BY_ID_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get topic by id",
      4000
    );
  }
}

function* updateTopics({ id, payload }) {
  try {
    const res = yield call(updateTopic, id, payload);
    NotificationManager.success(res?.data?.message, "Update topic", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update topic",
      4000
    );
  }
}

function* deleteTopics({ id }) {
  try {
    const res = yield call(deleteTopic, id);
    NotificationManager.success(res?.data?.message, "Delete topic", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete topic",
      4000
    );
  }
}

function* createNewProblems({ payload }) {
  try {
    const res = yield call(createNewProblem, payload);
    NotificationManager.success(res?.data?.message, "Create new problem", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Create new problem",
      4000
    );
  }
}

function* updateProblems({ id, payload }) {
  try {
    const res = yield call(updateProblem, id, payload);
    NotificationManager.success(res?.data?.message, "Update problem", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update problem",
      4000
    );
  }
}

function* deleteProblems({ id }) {
  try {
    const res = yield call(deleteProblem, id);
    NotificationManager.success(res?.data?.message, "Delete problem", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete problem",
      4000
    );
  }
}

function* createNewSolutions({ payload }) {
  try {
    const res = yield call(createNewSolution, payload);
    NotificationManager.success(res?.data?.message, "Create new solution", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Create new solution",
      4000
    );
  }
}

function* updateSolutions({ id, payload }) {
  try {
    const res = yield call(updateSolution, id, payload);
    NotificationManager.success(res?.data?.message, "Update solution", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update solution",
      4000
    );
  }
}

function* deleteSolutions({ id }) {
  try {
    const res = yield call(deleteSolution, id);
    NotificationManager.success(res?.data?.message, "Delete solution", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete solution",
      4000
    );
  }
}

function* watchStudySpaceSaga() {
  yield takeLatest(studySpaceAction.DELETE_SOLUTION, deleteSolutions);
  yield takeLatest(studySpaceAction.UPDATE_SOLUTION, updateSolutions);
  yield takeLatest(studySpaceAction.CREATE_NEW_SOLUTION, createNewSolutions);
  yield takeLatest(studySpaceAction.DELETE_PROBLEM, deleteProblems);
  yield takeLatest(studySpaceAction.UPDATE_PROBLEM, updateProblems);
  yield takeLatest(studySpaceAction.CREATE_NEW_PROBLEM, createNewProblems);
  yield takeLatest(studySpaceAction.DELETE_TOPIC, deleteTopics);
  yield takeLatest(studySpaceAction.UPDATE_TOPIC, updateTopics);
  yield takeLatest(studySpaceAction.GET_TOPIC_BY_ID, fetchTopicById);
  yield takeLatest(studySpaceAction.CREATE_NEW_TOPIC, createNewTopics);
  yield takeLatest(studySpaceAction.LEAVE_GROUP, leaveGroups);
  yield takeLatest(studySpaceAction.DELETE_MEMBER, deleteMembers);
  yield takeLatest(studySpaceAction.ADD_NEW_MEMBER, addMembers);
  yield takeLatest(studySpaceAction.DELETE_GROUP, deleteGroups);
  yield takeLatest(studySpaceAction.UPDATE_GROUP, updateGroups);
  yield takeLatest(studySpaceAction.CREATE_NEW_GROUP, createNewGroups);
  yield takeLatest(studySpaceAction.GET_ALL_GROUP, fetchAllGroups);
}

export default watchStudySpaceSaga;
