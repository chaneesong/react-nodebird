import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

function addPostAPI() {
  return axios.post('/api/post');
}

function* addPost() {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: 'ADD_POST_REQUEST',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
