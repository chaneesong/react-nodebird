import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST,
  ADD_COMMENT,
  REMOVE_POST,
  LOAD_POSTS,
  LIKE_POST,
  UNLIKE_POST,
} from '../actions/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostAPI() {
  return axios.get('/posts');
}

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: LOAD_POSTS.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_POSTS.failure,
      data: error.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', { content: data });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST.success,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST.failure,
      data: error.response.data,
    });
  }
}

function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);

    yield put({
      type: REMOVE_POST.success,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST.failure,
      data: error.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT.success,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT.failure,
      data: error.response.data,
    });
  }
}

function likePostAPI(postId) {
  return axios.patch(`/post/${postId}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST.success,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LIKE_POST.failure,
      data: error.response.data,
    });
  }
}

function unlikePostAPI(postId) {
  return axios.patch(`/post/${postId}/unlike`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST.success,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST.failure,
      data: error.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POSTS.request, loadPost);
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

function* watchLikePost() {
  yield takeLatest(LIKE_POST.request, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST.request, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}
