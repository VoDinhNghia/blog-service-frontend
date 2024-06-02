import { call, put } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";

export function* fetchById(serviceFc, id, action, message) {
  try {
    const res = yield call(serviceFc, id);
    yield put({
      type: action,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}

export function* fetchList(serviceFc, payload, action, message) {
  try {
    const res = yield call(serviceFc, payload);
    yield put({
      type: action,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}

export function* addNewItem(serviceFc, payload, message) {
  try {
    const res = yield call(serviceFc, payload);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}

export function* updateItem(serviceFc, id, payload, message) {
  try {
    const res = yield call(serviceFc, id, payload);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}

export function* deleteItem(serviceFc, id, message) {
  try {
    const res = yield call(serviceFc, id);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}

export function* addNewItemById(serviceFc, id, payload, message) {
  try {
    const res = yield call(serviceFc, id, payload);
    NotificationManager.success(res?.data?.message, message, 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}

export function* actionPosts(actionFc, payload, message) {
  try {
    yield call(actionFc, payload);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, message, 4000);
  }
}
