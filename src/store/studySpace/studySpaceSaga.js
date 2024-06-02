import { takeLatest } from "redux-saga/effects";
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
import {
  fetchList,
  addNewItem,
  updateItem,
  deleteItem,
  addNewItemById,
  fetchById,
} from "../sagaCommon";

function* fetchAllGroups({ payload }) {
  yield fetchList(
    getAllGroup,
    payload,
    studySpaceAction.GET_ALL_GROUP_SUCCESS,
    "get all groups"
  );
}

function* createNewGroups({ payload }) {
  yield addNewItem(createNewGroup, payload, "Create new group");
}

function* updateGroups({ id, payload }) {
  yield updateItem(updateGroup, id, payload, "Update group");
}

function* deleteGroups({ id }) {
  yield deleteItem(deleteGroup, id, "Delete group");
}

function* addMembers({ id, payload }) {
  yield addNewItemById(addMember, id, payload, "Add member");
}

function* deleteMembers({ id }) {
  yield deleteItem(deleteMember, id, "Delete member");
}

function* leaveGroups({ groupId }) {
  yield deleteItem(leaveGroup, groupId, "Leave group");
}

function* createNewTopics({ payload }) {
  yield addNewItem(createNewTopic, payload, "Create new topic");
}

function* fetchTopicById({ id }) {
  yield fetchById(
    getTopicById,
    id,
    studySpaceAction.GET_TOPIC_BY_ID_SUCCESS,
    "Get topic by id"
  );
}

function* updateTopics({ id, payload }) {
  yield updateItem(updateTopic, id, payload, "Update topic");
}

function* deleteTopics({ id }) {
  yield deleteItem(deleteTopic, id, "Delete topic");
}

function* createNewProblems({ payload }) {
  yield addNewItem(createNewProblem, payload, "Create new problem");
}

function* updateProblems({ id, payload }) {
  yield updateItem(updateProblem, id, payload, "Update problem");
}

function* deleteProblems({ id }) {
  yield deleteItem(deleteProblem, id, "Delete problem");
}

function* createNewSolutions({ payload }) {
  yield addNewItem(createNewSolution, payload, "Create new solution");
}

function* updateSolutions({ id, payload }) {
  yield updateItem(updateSolution, id, payload, "Update solution");
}

function* deleteSolutions({ id }) {
  yield deleteItem(deleteSolution, id, "Delete solution");
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
