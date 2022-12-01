import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import dotenv from 'dotenv';

import userSaga from './user';
import postSaga from './post';

dotenv.config();

axios.defaults.baseURL = process.env.AXIOS_DEFAULTS_BASEURL;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
