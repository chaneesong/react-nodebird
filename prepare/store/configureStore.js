import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import rootReducer from '../reducers';

const isDev = process.env.NODE_ENV === 'development';

const createStore = () => {
  const middleware = [];
  if (isDev) {
    middleware.concat(logger);
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export default wrapper;
