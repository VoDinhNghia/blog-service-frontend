import { call, put, takeLatest } from "redux-saga/effects";
import { sendMessage, getOneConversation } from "../../services/messageService";
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

function* fetchOneConversation({ payload }) {
  try {
    const res = yield call(getOneConversation, payload?.id);
    yield put({
      type: messageAction.GET_ONE_CONVERSATION_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* watchMessageSage() {
  yield takeLatest(messageAction.GET_ONE_CONVERSATION, fetchOneConversation);
  yield takeLatest(messageAction.SEND_MESSAGE, sendNewMessage);
}

export default watchMessageSage;
