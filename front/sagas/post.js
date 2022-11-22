import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import { faker } from '@faker-js/faker';

import {
  ADD_POST,
  ADD_COMMENT,
  REMOVE_POST,
  LOAD_POSTS,
} from '../actions/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import { generateDummyPost } from '../reducers/post';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);

    const id = faker.data.uuid();
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

function loadPostAPI() {
  return axios.get('/api/posts');
}

function* loadPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: LOAD_POSTS.success,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: LOAD_POSTS.failure,
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

function* watchLoadPost() {
  yield takeLatest(LOAD_POSTS.request, loadPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST.request, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT.request, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
