import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAllPosts,
  likePost,
  sharePost,
  commentPost,
  updatePost,
  deletePost,
} from "../services/postService";
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

function* commentPosts({ payload }) {
  try {
    yield call(commentPost, payload);
  } catch (error) {}
}

function* updatePosts({ id, payload }) {
  try {
    const res = yield call(updatePost, id, payload);
    NotificationManager.success(res?.data?.message, "Update post", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update post",
      4000
    );
  }
}

function* deletePosts({ id }) {
  try {
    const res = yield call(deletePost, id);
    NotificationManager.success(res?.data?.message, "Delete post", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete post",
      4000
    );
  }
}

function* watchGetAllPost() {
  yield takeLatest(postAction.DELETE_POST, deletePosts);
  yield takeLatest(postAction.UPDATE_POST, updatePosts);
  yield takeLatest(postAction.COMMENT_POST, commentPosts);
  yield takeLatest(postAction.SHARE_POST, sharePosts);
  yield takeLatest(postAction.LIKE_POST, likePosts);
  yield takeLatest(postAction.GET_ALL_POST, getAllPost);
}

export default watchGetAllPost;
