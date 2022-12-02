import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  FOLLOW,
  UNFOLLOW,
  LOAD_MY_INFO,
} from '../actions/user';

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo(action) {
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

function* logOut(action) {
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

function followAPI() {
  return axios.post('/user/follow');
}

function* follow(action) {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: FOLLOW.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW.failure,
      error: error.response.data,
    });
  }
}

function unFollowAPI() {
  return axios.post('/user/unfollow');
}

function* unFollow(action) {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: UNFOLLOW.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW.failure,
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

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
