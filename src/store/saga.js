import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAllPosts } from "../services/postService";
import { postAction } from './action';

function* getAllPost({ payload }) {
    try {
        const { limit = 10, page = 1 } = payload;
        const res = yield call(fetchAllPosts, page, limit);
        yield put({ type: postAction.GET_ALL_POST_SUCCESS, payload: res?.data?.data })
    } catch (error) {
    }
}

function* watchGetAllPost() {
    yield takeLatest(postAction.GET_ALL_POST, getAllPost)
}

export default watchGetAllPost;