import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_POST, ADD_COMMENT } from '../actions/post';

function addPostAPI() {
  return axios.post('/api/post');
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: ADD_POST.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST.failure,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST.request, addPost);
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(addCommentAPI, action.data);
    console.log(action.data);
    yield put({
      type: ADD_COMMENT.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT.failure,
      data: error.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT.request, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
