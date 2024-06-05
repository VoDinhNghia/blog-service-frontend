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
} from "../../services/post.service";
import { postAction } from "../action.store";
import { typePostListPage } from "../../constants/constant";
import { fetchList, actionPosts, updateItem, deleteItem } from "../saga-common.store";

function* getAllPost({ payload }) {
  yield fetchList(
    fetchAllPosts,
    payload,
    postAction.GET_ALL_POST_SUCCESS,
    "Get all posts"
  );
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
  yield actionPosts(likePost, payload, "Like post");
}

function* sharePosts({ payload }) {
  yield actionPosts(sharePost, payload, "Share post");
}

function* commentPosts({ payload }) {
  yield actionPosts(commentPost, payload, "Comment post");
}

function* updatePosts({ id, payload }) {
  yield updateItem(updatePost, id, payload, "Update post");
}

function* deletePosts({ id }) {
  yield deleteItem(deletePost, id, "Delete post");
}

function* deleteImagePosts({ id }) {
  yield deleteItem(deleteImagePost, id, "Delete image");
}

function* updateComments({ id, payload }) {
  yield updateItem(updateComment, id, payload, "Update comment");
}

function* deleteComments({ id }) {
  yield deleteItem(deleteComment, id, "Delete comment");
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
