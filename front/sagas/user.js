import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import { LOG_IN, LOG_OUT, SIGN_UP, FOLLOW, UNFOLLOW } from '../actions/user';

function logInAPI(data) {
  return axios.post('http://localhost:3065/user', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN.failure,
      error: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('http://localhost:3065/logout');
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT.success,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT.failure,
      error: error.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('http://localhost:3065/user', data);
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
  return axios.post('/api/follow');
}

function* follow(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
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
  return axios.post('/api/unfollow');
}

function* unFollow(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
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
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
