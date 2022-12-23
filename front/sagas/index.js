import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import backURL from '../config.js';

import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = `http://${backURL}`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
