import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';

import { ADD_POST, ADD_COMMENT, REMOVE_POST } from '../actions/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function addPostAPI() {
  return axios.post('/api/post');
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);

    const id = shortId.generate();
    yield put({
      type: ADD_POST.success,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST.failure,
      data: error.response.data,
    });
  }
}

function removePostAPI() {
  return axios.delete('/api/post');
}

function* removePost(action) {
  try {
    yield delay(1000);
    // const result = yield call(removePost);

    yield put({
      type: REMOVE_POST.success,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST.failure,
      data: error.response.data,
    });
  }
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

function* watchAddPost() {
  yield takeLatest(ADD_POST.request, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST.request, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT.request, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
