import { call, put, takeLatest } from "redux-saga/effects";
import { getAllPosts } from "../services/postService";

function* getAllPost(page, limit) {
    try {
        console.log('rjsjjsjs');
        const res = yield call(getAllPosts(1, 100));
        console.log('response', res);
        yield put({ type: "GET_ALL_POST", payload: res })
    } catch (error) {
    }
}

function* watchGetAllPost() {
    yield takeLatest("GET_ALL_POST", getAllPost)
}

export default watchGetAllPost;