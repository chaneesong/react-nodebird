import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST,
  ADD_COMMENT,
  REMOVE_POST,
  LOAD_POSTS,
  LOAD_USER_POSTS,
  LOAD_HASHTAG_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPLOAD_IMAGES,
  RETWEET,
  LOAD_POST,
  EDIT_POST,
} from '../actions/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_POSTS.failure,
      error: error.response.data,
    });
  }
}

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    console.log(result);
    yield put({
      type: LOAD_USER_POSTS.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_POSTS.failure,
      error: error.response.data,
    });
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  );
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    console.log(result);
    yield put({
      type: LOAD_HASHTAG_POSTS.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_HASHTAG_POSTS.failure,
      error: error.response.data,
    });
  }
}

function loadPostAPI(postId) {
  return axios.get(`/post/${postId}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_POST.failure,
      error: error.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
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
      error: error.response.data,
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
      error: error.response.data,
    });
  }
}

function editPostAPI(data) {
  return axios.patch(`/post/${data.PostId}`, data);
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);

    yield put({
      type: EDIT_POST.success,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: EDIT_POST.failure,
      error: error.response.data,
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
      error: error.response.data,
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
      error: error.response.data,
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
      error: error.response.data,
    });
  }
}

function uploadImagesAPI(images) {
  return axios.post(`/post/images`, images);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES.success,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES.failure,
      error: error.response.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET.success,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: RETWEET.failure,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS.request, loadPosts);
}
function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS.request, loadUserPosts);
}
function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS.request, loadHashtagPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST.request, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST.request, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST.request, removePost);
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST.request, editPost);
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

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES.request, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(RETWEET.request, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchEditPost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}
