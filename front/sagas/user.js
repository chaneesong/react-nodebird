import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { LOG_IN, LOG_OUT, SIGN_UP, FOLLOW, UNFOLLOW } from '../actions/user';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
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
  return axios.post('/api/logout');
}

function* logOut(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
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

function signUpAPI() {
  return axios.post('/api/signup');
}

function* signUp(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
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

function* watchLogIn() {
  yield takeLatest(LOG_IN.request, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT.request, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP.request, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
