import { call, put, takeLatest } from "redux-saga/effects";
import {
  sendMessage,
  getOneConversation,
  getAllMessage,
  getAllMessageByConver
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


function* watchMessageSage() {
  yield takeLatest(messageAction.GET_MESSAGE_BY_CONVERSATION, fetchAllMessageByConver);
  yield takeLatest(messageAction.GET_ALL_MESSAGE, fetchAllMessage);
  yield takeLatest(messageAction.GET_ONE_CONVERSATION, fetchOneConversation);
  yield takeLatest(messageAction.SEND_MESSAGE, sendNewMessage);
}

export default watchMessageSage;
