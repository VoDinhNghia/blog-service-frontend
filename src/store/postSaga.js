import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAllPosts, likePost, sharePost } from "../services/postService";
import { postAction } from "./action";
import { NotificationManager } from "react-notifications";

function* getAllPost({ payload }) {
  try {
    const res = yield call(fetchAllPosts, payload);
    yield put({
      type: postAction.GET_ALL_POST_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* likePosts({ payload }) {
  try {
    const { postId } = payload;
    yield call(likePost, postId);
  } catch (error) {}
}

function* sharePosts({ payload }) {
  try {
    yield call(sharePost, payload);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Share post",
      4000
    );
  }
}

function* watchGetAllPost() {
  yield takeLatest(postAction.SHARE_POST, sharePosts);
  yield takeLatest(postAction.LIKE_POST, likePosts);
  yield takeLatest(postAction.GET_ALL_POST, getAllPost);
}

export default watchGetAllPost;
