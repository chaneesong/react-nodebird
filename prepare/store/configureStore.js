import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const isDev = process.env.NODE_ENV === 'development';

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, logger];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
    devTools: isDev,
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export default wrapper;
