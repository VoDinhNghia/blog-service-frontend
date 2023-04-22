import { call, takeLatest } from "redux-saga/effects";
import { sendMessage } from "../../services/messageService";
import { messageAction } from "../action";
import { NotificationManager } from "react-notifications";

function* sendNewMessage({ payload }) {
  try {
    yield call(sendMessage, payload?.userId);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Send message",
      4000
    );
  }
}

function* watchMessageSage() {
  yield takeLatest(messageAction.SEND_MESSAGE, sendNewMessage);
}

export default watchMessageSage;
