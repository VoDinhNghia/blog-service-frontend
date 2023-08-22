import { call, put, takeLatest } from "redux-saga/effects";
import {
  sendMessage,
  getOneConversation,
  getAllMessage,
  getAllMessageByConver,
  getListConversationByUser,
  updateStatusMessage,
} from "../../services/messageService";
import { messageAction } from "../action";
import { NotificationManager } from "react-notifications";

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
  try {
    const res = yield call(getOneConversation, chatWithId);
    yield put({
      type: messageAction.GET_ONE_CONVERSATION_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* fetchAllMessage({ payload }) {
  try {
    const res = yield call(getAllMessage, payload);
    yield put({
      type: messageAction.GET_ALL_MESSAGE_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* fetchAllMessageByConver({ payload }) {
  try {
    const res = yield call(getAllMessageByConver, payload);
    yield put({
      type: messageAction.GET_MESSAGE_BY_CONVERSATION_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* updateStatusMsg({ id, payload }) {
  try {
    yield call(updateStatusMessage, id, payload);
  } catch (error) {
    NotificationManager.error(error?.response?.message, "Update message", 4000);
  }
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
