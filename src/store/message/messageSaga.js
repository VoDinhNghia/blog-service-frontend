import { call, put, takeLatest } from "redux-saga/effects";
import {
  sendMessage,
  getOneConversation,
  getAllMessage,
  getAllMessageByConver,
  getListConversationByUser,
  updateStatusMessage,
} from "../../services/message.service";
import { messageAction } from "../action";
import { NotificationManager } from "react-notifications";
import { fetchById, fetchList, updateItem } from "../sagaCommon";

function* sendNewMessage({ payload }) {
  try {
    yield call(sendMessage, payload);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Send message",
      4000
    );
  }
}

function* fetchOneConversation({ chatWithId }) {
  yield fetchById(
    getOneConversation,
    chatWithId,
    messageAction.GET_ONE_CONVERSATION_SUCCESS,
    "Get conversation"
  );
}

function* fetchAllMessage({ payload }) {
  yield fetchList(
    getAllMessage,
    payload,
    messageAction.GET_ALL_MESSAGE_SUCCESS,
    "Get all message"
  );
}

function* fetchAllMessageByConver({ payload }) {
  yield fetchList(
    getAllMessageByConver,
    payload,
    messageAction.GET_MESSAGE_BY_CONVERSATION_SUCCESS,
    "Get all message of converation"
  );
}

function* updateStatusMsg({ id, payload }) {
  yield updateItem(updateStatusMessage, id, payload, "Update message");
}

function* fetchConverByUser() {
  try {
    const res = yield call(getListConversationByUser);
    yield put({
      type: messageAction.GET_CONVERSATION_BY_USER_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* watchMessageSage() {
  yield takeLatest(
    messageAction.GET_MESSAGE_BY_CONVERSATION,
    fetchAllMessageByConver
  );
  yield takeLatest(messageAction.GET_ALL_MESSAGE, fetchAllMessage);
  yield takeLatest(messageAction.GET_ONE_CONVERSATION, fetchOneConversation);
  yield takeLatest(messageAction.SEND_MESSAGE, sendNewMessage);
  yield takeLatest(messageAction.UPDATE_STATUS_MESSAGE, updateStatusMsg);
  yield takeLatest(messageAction.GET_CONVERSATION_BY_USER, fetchConverByUser);
}

export default watchMessageSage;
