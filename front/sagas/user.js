import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  FOLLOW,
  UNFOLLOW,
  LOAD_MY_INFO,
  CHANGE_NICKNAME,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWINGS,
  REMOVE_FOLLOWER,
} from '../actions/user';

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO.failure,
      error: error.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN.failure,
      error: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT.failure,
      error: error.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP.failure,
      error: error.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FOLLOW.failure,
      error: error.response.data,
    });
  }
}

function unFollowAPI(data) {
  return axios.delete(`/user/follow/${data}`);
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type: UNFOLLOW.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: UNFOLLOW.failure,
      error: error.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: REMOVE_FOLLOWER.failure,
      error: error.response.data,
    });
  }
}

function loadFollowersAPI() {
  return axios.get(`/user/followers`);
}

function* loadFollowers() {
  try {
    const result = yield call(loadFollowersAPI);
    yield put({
      type: LOAD_FOLLOWERS.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOAD_FOLLOWERS.failure,
      error: error.response.data,
    });
  }
}

function loadFollowingsAPI() {
  return axios.get(`/user/followings`);
}

function* loadFollowings() {
  try {
    const result = yield call(loadFollowingsAPI);
    yield put({
      type: LOAD_FOLLOWINGS.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOAD_FOLLOWINGS.failure,
      error: error.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME.success,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_NICKNAME.failure,
      error: error.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO.request, loadMyInfo);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN.request, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT.request, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP.request, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW.request, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW.request, unFollow);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME.request, changeNickname);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS.request, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS.request, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER.request, removeFollower);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchChangeNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
  ]);
}
