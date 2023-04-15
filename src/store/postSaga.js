import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAllPosts,
  likePost,
  sharePost,
  commentPost,
  updatePost,
  deletePost,
  deleteImagePost,
  updateComment,
  deleteComment,
} from "../services/postService";
import { postAction } from "./action";
import { NotificationManager } from "react-notifications";
import { typePostListPage } from "../common/constant";

function* getAllPost({ payload }) {
  try {
    const res = yield call(fetchAllPosts, payload);
    yield put({
      type: postAction.GET_ALL_POST_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {}
}

function* getAllPostPersonel({ payload }) {
  try {
    const res = yield call(fetchAllPosts, payload);
    yield put({
      type: postAction.GET_ALL_POST_PERSONEL_SUCCESS,
      payload: {
        ...res?.data?.data,
        userId: payload?.userId,
        typePage: typePostListPage.PERSONEL_PAGE,
      },
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

function* deleteImagePosts({ id }) {
  try {
    const res = yield call(deleteImagePost, id);
    NotificationManager.success(res?.data?.message, "Delete image", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete image",
      4000
    );
  }
}

function* updateComments({ id, payload }) {
  try {
    const res = yield call(updateComment, id, payload);
    NotificationManager.success(res?.data?.message, "Update comment", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update comment",
      4000
    );
  }
}

function* deleteComments({ id }) {
  try {
    const res = yield call(deleteComment, id);
    NotificationManager.success(res?.data?.message, "Delete comment", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete comment",
      4000
    );
  }
}

function* watchGetAllPost() {
  yield takeLatest(postAction.DELETE_COMMENT, deleteComments);
  yield takeLatest(postAction.UPDATE_COMMENT, updateComments);
  yield takeLatest(postAction.DELETE_IMAGE_POST, deleteImagePosts);
  yield takeLatest(postAction.DELETE_POST, deletePosts);
  yield takeLatest(postAction.UPDATE_POST, updatePosts);
  yield takeLatest(postAction.COMMENT_POST, commentPosts);
  yield takeLatest(postAction.SHARE_POST, sharePosts);
  yield takeLatest(postAction.LIKE_POST, likePosts);
  yield takeLatest(postAction.GET_ALL_POST_PERSONEL, getAllPostPersonel);
  yield takeLatest(postAction.GET_ALL_POST, getAllPost);
}

export default watchGetAllPost;
